import 'package:flutter/material.dart';
import '../../core/constants/app_colors.dart';
import '../../core/utils/app_responsive.dart';

class CustomButton extends StatelessWidget {
  final String text;
  final VoidCallback? onPressed;
  final bool isLoading;
  final bool isOutline;
  final IconData? icon;
  final Color? backgroundColor;
  final Color? textColor;
  final double? width;
  final double? height;
  final double? borderRadius;

  const CustomButton({
    super.key,
    required this.text,
    this.onPressed,
    this.isLoading = false,
    this.isOutline = false,
    this.icon,
    this.backgroundColor,
    this.textColor,
    this.width,
    this.height,
    this.borderRadius,
  });

  @override
  Widget build(BuildContext context) {
    AppResponsive.init(context);
    final effectiveBg = backgroundColor ?? AppColors.primary;
    final effectiveText = textColor ?? (isOutline ? AppColors.primary : Colors.white);
    final effectiveHeight = height ?? AppResponsive.buttonHeight;
    final effectiveRadius = borderRadius ?? AppResponsive.buttonRadius;

    if (isOutline) {
      return SizedBox(
        width: width ?? double.infinity,
        height: effectiveHeight,
        child: OutlinedButton(
          onPressed: isLoading ? null : onPressed,
          style: OutlinedButton.styleFrom(
            foregroundColor: effectiveBg,
            side: BorderSide(color: effectiveBg, width: 1.8),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(effectiveRadius),
            ),
          ),
          child: _buildChild(effectiveText, context),
        ),
      );
    }

    return Container(
      width: width ?? double.infinity,
      height: effectiveHeight,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(effectiveRadius),
        gradient: backgroundColor == null
            ? const LinearGradient(
                colors: [Color(0xFF2563EB), Color(0xFF1D4ED8)],
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
              )
            : null,
        color: backgroundColor,
        boxShadow: onPressed == null || isLoading
            ? null
            : [
                BoxShadow(
                  color: (backgroundColor ?? AppColors.primary).withValues(alpha: 0.35),
                  blurRadius: 16,
                  offset: const Offset(0, 6),
                ),
              ],
      ),
      child: ElevatedButton(
        onPressed: isLoading ? null : onPressed,
        style: ElevatedButton.styleFrom(
          backgroundColor: Colors.transparent,
          shadowColor: Colors.transparent,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(effectiveRadius),
          ),
        ),
        child: _buildChild(effectiveText, context),
      ),
    );
  }

  Widget _buildChild(Color textColor, BuildContext context) {
    if (isLoading) {
      return SizedBox(
        width: AppResponsive.iconMedium,
        height: AppResponsive.iconMedium,
        child: const CircularProgressIndicator(
          strokeWidth: 2.5,
          color: Colors.white,
        ),
      );
    }

    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        if (icon != null) ...[
          Icon(icon, size: AppResponsive.iconMedium * 0.9, color: textColor),
          SizedBox(width: AppResponsive.w(2)),
        ],
        Text(
          text,
          style: TextStyle(
            color: textColor, 
            fontWeight: FontWeight.w600,
            fontSize: AppResponsive.bodyFontSize * 1.05,
          ),
        ),
      ],
    );
  }
}
