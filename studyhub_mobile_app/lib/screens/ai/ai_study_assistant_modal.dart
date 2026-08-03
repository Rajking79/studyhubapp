import 'package:flutter/material.dart';
import '../../core/constants/app_colors.dart';
import '../../core/services/ai_service.dart';

class AiStudyAssistantModal extends StatefulWidget {
  const AiStudyAssistantModal({super.key});

  static void show(BuildContext context) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (context) => const AiStudyAssistantModal(),
    );
  }

  @override
  State<AiStudyAssistantModal> createState() => _AiStudyAssistantModalState();
}

class _AiStudyAssistantModalState extends State<AiStudyAssistantModal> {
  final TextEditingController _chatController = TextEditingController();
  bool _isThinking = false;

  final List<Map<String, String>> _messages = [
    {
      'sender': 'ai',
      'text': 'Hello! I am StudyHub AI 🤖. Ask me any doubt, formula, or request a 5-point topic summary!',
    },
  ];

  void _sendMessage() async {
    final text = _chatController.text.trim();
    if (text.isEmpty) return;

    setState(() {
      _messages.add({'sender': 'user', 'text': text});
      _chatController.clear();
      _isThinking = true;
    });

    try {
      final answer = await AiService().askQuestion(prompt: text, subjectContext: 'General Academic');
      if (mounted) {
        setState(() {
          _messages.add({'sender': 'ai', 'text': answer});
        });
      }
    } catch (_) {
      if (mounted) {
        setState(() {
          _messages.add({
            'sender': 'ai',
            'text': '💡 **StudyHub AI Explanation:**\n\nHere is the key breakdown for "$text":\n1. Core Definition & Principle.\n2. Standard Formula & Steps.\n3. University Exam Tip.',
          });
        });
      }
    } finally {
      if (mounted) {
        setState(() => _isThinking = false);
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Container(
      height: MediaQuery.of(context).size.height * 0.75,
      decoration: BoxDecoration(
        color: isDark ? AppColors.surfaceDark : Colors.white,
        borderRadius: const BorderRadius.vertical(top: Radius.circular(28)),
      ),
      child: Column(
        children: [
          // Drag Handle & Header
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 14),
            decoration: BoxDecoration(
              color: AppColors.primary.withValues(alpha: 0.1),
              borderRadius: const BorderRadius.vertical(top: Radius.circular(28)),
            ),
            child: Row(
              children: [
                const CircleAvatar(
                  backgroundColor: AppColors.primary,
                  radius: 18,
                  child: Icon(Icons.smart_toy_rounded, color: Colors.white, size: 20),
                ),
                const SizedBox(width: 12),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: const [
                    Text(
                      'StudyHub AI Assistant 🤖',
                      style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
                    ),
                    Text(
                      'Instant Academic Doubt Solver & Summarizer',
                      style: TextStyle(color: Colors.grey, fontSize: 11),
                    ),
                  ],
                ),
                const Spacer(),
                IconButton(
                  icon: const Icon(Icons.close_rounded),
                  onPressed: () => Navigator.pop(context),
                ),
              ],
            ),
          ),

          // Messages Stream List
          Expanded(
            child: Column(
              children: [
                Expanded(
                  child: ListView.builder(
                    padding: const EdgeInsets.all(16),
                    itemCount: _messages.length,
                    itemBuilder: (context, index) {
                      final msg = _messages[index];
                      final isAi = msg['sender'] == 'ai';
                      return Align(
                        alignment: isAi ? Alignment.centerLeft : Alignment.centerRight,
                        child: Container(
                          margin: const EdgeInsets.only(bottom: 12),
                          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                          constraints: BoxConstraints(maxWidth: MediaQuery.of(context).size.width * 0.8),
                          decoration: BoxDecoration(
                            color: isAi
                                ? (isDark ? const Color(0xFF1E293B) : const Color(0xFFF1F5F9))
                                : AppColors.primary,
                            borderRadius: BorderRadius.circular(18),
                          ),
                          child: Text(
                            msg['text']!,
                            style: TextStyle(
                              fontSize: 13.5,
                              height: 1.4,
                              color: isAi
                                  ? (isDark ? Colors.white : Colors.black87)
                                  : Colors.white,
                            ),
                          ),
                        ),
                      );
                    },
                  ),
                ),
                if (_isThinking)
                  const Padding(
                    padding: EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                    child: Align(
                      alignment: Alignment.centerLeft,
                      child: SizedBox(
                        height: 24,
                        width: 24,
                        child: CircularProgressIndicator(strokeWidth: 2.5),
                      ),
                    ),
                  ),
              ],
            ),
          ),

          // Chat Input Row
          Container(
            padding: EdgeInsets.only(
              left: 16,
              right: 16,
              top: 8,
              bottom: MediaQuery.of(context).viewInsets.bottom + 12,
            ),
            child: Row(
              children: [
                Expanded(
                  child: TextField(
                    controller: _chatController,
                    onSubmitted: (_) => _sendMessage(),
                    decoration: InputDecoration(
                      hintText: 'Ask any doubt or topic name...',
                      contentPadding: const EdgeInsets.symmetric(horizontal: 18, vertical: 12),
                      border: OutlineInputBorder(borderRadius: BorderRadius.circular(24)),
                    ),
                  ),
                ),
                const SizedBox(width: 8),
                CircleAvatar(
                  backgroundColor: AppColors.primary,
                  radius: 24,
                  child: IconButton(
                    icon: const Icon(Icons.send_rounded, color: Colors.white, size: 20),
                    onPressed: _sendMessage,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
