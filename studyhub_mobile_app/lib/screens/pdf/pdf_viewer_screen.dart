import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_pdfviewer/pdfviewer.dart';
import '../../core/constants/app_colors.dart';

class PdfViewerScreen extends StatefulWidget {
  final String title;
  final String pdfUrl;

  const PdfViewerScreen({
    super.key,
    this.title = 'OS_2024_EndSem.pdf',
    this.pdfUrl = 'https://cdn.syncfusion.com/content/PDFViewer/flutter-succinctly.pdf',
  });

  @override
  State<PdfViewerScreen> createState() => _PdfViewerScreenState();
}

class _PdfViewerScreenState extends State<PdfViewerScreen> {
  final PdfViewerController _pdfViewerController = PdfViewerController();
  bool _isDarkMode = false;
  bool _isBookmarked = false;
  int _currentPage = 1;
  int _totalPages = 28;

  void _showAiSummaryModal() {
    showModalBottomSheet(
      context: context,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
      ),
      builder: (context) => Container(
        padding: const EdgeInsets.all(20),
        height: 380,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: const [
                Icon(Icons.auto_awesome_rounded, color: AppColors.primary),
                SizedBox(width: 8),
                Text(
                  'AI PDF Executive Summary ⚡',
                  style: TextStyle(fontSize: 17, fontWeight: FontWeight.bold),
                ),
              ],
            ),
            const SizedBox(height: 12),
            Text(
              '5-Point Quick Revision for "${widget.title}":',
              style: const TextStyle(fontWeight: FontWeight.w600, color: Colors.grey, fontSize: 13),
            ),
            const SizedBox(height: 10),
            const Expanded(
              child: SingleChildScrollView(
                child: Text(
                  '1. 📌 **Process Scheduling**: CPU algorithms (FCFS, SJF, Round Robin) prioritize throughput and minimal turnaround time.\n\n'
                  '2. 📌 **Deadlock Conditions**: Mutual exclusion, hold & wait, no preemption, and circular wait.\n\n'
                  '3. 📌 **Paging & Virtual Memory**: Page tables map virtual addresses to physical frame numbers.\n\n'
                  '4. 📌 **Semaphores**: Mutex locks provide critical section synchronization.\n\n'
                  '5. 📌 **Banker Algorithm**: Used for deadlock avoidance in resource allocation.',
                  style: TextStyle(fontSize: 13.5, height: 1.45),
                ),
              ),
            ),
            SizedBox(
              width: double.infinity,
              height: 46,
              child: ElevatedButton(
                style: ElevatedButton.styleFrom(
                  backgroundColor: AppColors.primary,
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                ),
                onPressed: () => Navigator.pop(context),
                child: const Text('Got It!', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
              ),
            ),
          ],
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: _isDarkMode ? const Color(0xFF0F172A) : const Color(0xFF1E293B),
      appBar: AppBar(
        backgroundColor: const Color(0xFF0F172A),
        foregroundColor: Colors.white,
        title: Text(
          widget.title,
          style: const TextStyle(
            fontSize: 15,
            fontWeight: FontWeight.w600,
            color: Colors.white,
          ),
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.auto_awesome_rounded, color: AppColors.primary),
            tooltip: 'AI Summarize PDF',
            onPressed: _showAiSummaryModal,
          ),
          IconButton(
            icon: Icon(_isBookmarked ? Icons.bookmark_rounded : Icons.bookmark_border_rounded),
            color: _isBookmarked ? AppColors.accent : Colors.white,
            onPressed: () {
              setState(() => _isBookmarked = !_isBookmarked);
            },
          ),
          IconButton(
            icon: const Icon(Icons.share_outlined),
            onPressed: () {},
          ),
        ],
      ),
      body: SafeArea(
        child: Column(
          children: [
            // Floating Page Counter Pill
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 6),
              margin: const EdgeInsets.only(top: 10, bottom: 6),
              decoration: BoxDecoration(
                color: Colors.black.withValues(alpha: 0.6),
                borderRadius: BorderRadius.circular(20),
              ),
              child: Text(
                '$_currentPage / $_totalPages',
                style: const TextStyle(
                  color: Colors.white,
                  fontSize: 12,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
            // PDF Document View area
            Expanded(
              child: Container(
                color: _isDarkMode ? const Color(0xFF1E293B) : Colors.white,
                child: SfPdfViewer.network(
                  widget.pdfUrl,
                  controller: _pdfViewerController,
                  onPageChanged: (PdfPageChangedDetails details) {
                    setState(() {
                      _currentPage = details.newPageNumber;
                    });
                  },
                  onDocumentLoaded: (PdfDocumentLoadedDetails details) {
                    setState(() {
                      _totalPages = details.document.pages.count;
                    });
                  },
                ),
              ),
            ),
            // Bottom Controls Bar
            Container(
              color: const Color(0xFF0F172A),
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceAround,
                children: [
                  _buildBottomTool(
                    Icons.auto_awesome_rounded,
                    'AI Summary',
                    _showAiSummaryModal,
                  ),
                  _buildBottomTool(
                    Icons.zoom_in_rounded,
                    'Zoom',
                    () => _pdfViewerController.zoomLevel = 2.0,
                  ),
                  _buildBottomTool(
                    Icons.highlight_rounded,
                    'Highlight',
                    () {},
                  ),
                  _buildBottomTool(
                    _isDarkMode ? Icons.light_mode_rounded : Icons.dark_mode_rounded,
                    'Mode',
                    () => setState(() => _isDarkMode = !_isDarkMode),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildBottomTool(IconData icon, String label, VoidCallback onTap) {
    return GestureDetector(
      onTap: onTap,
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(icon, color: Colors.white70, size: 20),
          const SizedBox(height: 3),
          Text(
            label,
            style: const TextStyle(color: Colors.white70, fontSize: 11),
          ),
        ],
      ),
    );
  }
}
