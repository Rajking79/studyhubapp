import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:google_fonts/google_fonts.dart';
import '../../core/constants/app_colors.dart';

class CustomSearchBarWidget extends StatefulWidget {
  final String hintText;
  final ValueChanged<String>? onChanged;
  final ValueChanged<String>? onSubmitted;
  final VoidCallback? onTap;
  final VoidCallback? onVoiceTap;
  final bool readOnly;
  final TextEditingController? controller;
  final Widget? trailing;

  const CustomSearchBarWidget({
    super.key,
    this.hintText = 'Search for colleges, subjects, notes...',
    this.onChanged,
    this.onSubmitted,
    this.onTap,
    this.onVoiceTap,
    this.readOnly = false,
    this.controller,
    this.trailing,
  });

  @override
  State<CustomSearchBarWidget> createState() => _CustomSearchBarWidgetState();
}

class _CustomSearchBarWidgetState extends State<CustomSearchBarWidget> {
  final FocusNode _focusNode = FocusNode();
  bool _isFocused = false;
  bool _isPressed = false;

  @override
  void initState() {
    super.initState();
    _focusNode.addListener(_onFocusChange);
  }

  void _onFocusChange() {
    setState(() {
      _isFocused = _focusNode.hasFocus;
    });
  }

  @override
  void dispose() {
    _focusNode.removeListener(_onFocusChange);
    _focusNode.dispose();
    super.dispose();
  }

  void _triggerVoiceSearch() {
    if (widget.onVoiceTap != null) {
      widget.onVoiceTap!();
      return;
    }

    showModalBottomSheet(
      context: context,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
      ),
      builder: (context) => Container(
        padding: const EdgeInsets.all(24),
        height: 220,
        child: Column(
          children: [
            const Text(
              'Listening...',
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 8),
            const Text(
              'Speak subject name (e.g. Operating System, DBMS)',
              style: TextStyle(color: Colors.grey, fontSize: 13),
            ),
            const Spacer(),
            CircleAvatar(
              radius: 30,
              backgroundColor: AppColors.primary.withValues(alpha: 0.15),
              child: const Icon(Icons.mic_rounded, color: AppColors.primary, size: 32),
            ),
            const Spacer(),
          ],
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    const accentColor = Color(0xFF4F6BFF);
    const borderColorLight = Color(0xFFEEF2F7);
    const placeholderColorLight = Color(0xFF9AA5B1);

    return AnimatedScale(
      scale: _isPressed ? 0.98 : 1.0,
      duration: const Duration(milliseconds: 120),
      curve: Curves.easeOutCubic,
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 200),
        curve: Curves.easeOutCubic,
        height: 54,
        width: double.infinity,
        decoration: BoxDecoration(
          color: isDark ? AppColors.surfaceDark : Colors.white,
          borderRadius: BorderRadius.circular(28),
          border: Border.all(
            color: _isFocused
                ? accentColor
                : (isDark ? AppColors.borderDark : borderColorLight),
            width: _isFocused ? 1.8 : 1.2,
          ),
          boxShadow: isDark
              ? []
              : [
                  BoxShadow(
                    color: _isFocused
                        ? accentColor.withValues(alpha: 0.18)
                        : Colors.black.withValues(alpha: 0.04),
                    blurRadius: _isFocused ? 20 : 16,
                    spreadRadius: _isFocused ? 2 : 0,
                    offset: const Offset(0, 4),
                  ),
                ],
        ),
        child: Material(
          color: Colors.transparent,
          borderRadius: BorderRadius.circular(28),
          child: InkWell(
            borderRadius: BorderRadius.circular(28),
            onHighlightChanged: (value) {
              setState(() {
                _isPressed = value;
              });
            },
            onTap: widget.onTap,
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 18),
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  Icon(
                    Icons.search_rounded,
                    color: accentColor,
                    size: 22,
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: Center(
                      child: TextField(
                        focusNode: _focusNode,
                        controller: widget.controller,
                        readOnly: widget.readOnly,
                        onTap: widget.onTap,
                        onChanged: widget.onChanged,
                        onSubmitted: widget.onSubmitted,
                        textAlignVertical: TextAlignVertical.center,
                        style: GoogleFonts.poppins(
                          fontSize: 15,
                          fontWeight: FontWeight.w500,
                          color: isDark
                              ? AppColors.textPrimaryDark
                              : AppColors.textPrimaryLight,
                        ),
                        decoration: InputDecoration(
                          hintText: widget.hintText,
                          hintStyle: GoogleFonts.poppins(
                            fontSize: 15,
                            fontWeight: FontWeight.w500,
                            color: isDark
                                ? AppColors.textMutedDark
                                : placeholderColorLight,
                          ),
                          border: InputBorder.none,
                          enabledBorder: InputBorder.none,
                          focusedBorder: InputBorder.none,
                          isDense: true,
                          contentPadding: EdgeInsets.zero,
                        ),
                      ),
                    ),
                  ),
                  if (widget.trailing != null) widget.trailing!,
                  if (widget.trailing == null &&
                      widget.controller != null &&
                      widget.controller!.text.isNotEmpty)
                    GestureDetector(
                      onTap: () {
                        widget.controller!.clear();
                        if (widget.onChanged != null) widget.onChanged!('');
                      },
                      child: Padding(
                        padding: const EdgeInsets.only(left: 8),
                        child: Icon(
                          Icons.cancel_rounded,
                          size: 18,
                          color: isDark
                              ? AppColors.textMutedDark
                              : placeholderColorLight,
                        ),
                      ),
                    ),
                  if (widget.trailing == null &&
                      (widget.controller == null || widget.controller!.text.isEmpty)) ...[
                    GestureDetector(
                      onTap: () => context.push('/snap-solve'),
                      child: Padding(
                        padding: const EdgeInsets.only(left: 4, right: 6),
                        child: Icon(
                          Icons.camera_alt_rounded,
                          size: 20,
                          color: accentColor,
                        ),
                      ),
                    ),
                    GestureDetector(
                      onTap: _triggerVoiceSearch,
                      child: Padding(
                        padding: const EdgeInsets.only(left: 4),
                        child: Icon(
                          Icons.mic_rounded,
                          size: 20,
                          color: accentColor,
                        ),
                      ),
                    ),
                  ],
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
