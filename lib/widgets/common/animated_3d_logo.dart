import 'dart:math' as math;
import 'package:flutter/material.dart';
import '../../core/constants/app_colors.dart';

class Animated3DLogo extends StatefulWidget {
  final double size;
  final bool enableTilt;
  const Animated3DLogo({
    super.key,
    this.size = 160,
    this.enableTilt = true,
  });

  @override
  State<Animated3DLogo> createState() => _Animated3DLogoState();
}

class _Animated3DLogoState extends State<Animated3DLogo>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _floatAnim;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 2000),
    )..repeat(reverse: true);

    _floatAnim = Tween<double>(begin: -10.0, end: 10.0).animate(
      CurvedAnimation(parent: _controller, curve: Curves.easeInOut),
    );
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _controller,
      builder: (context, child) {
        final progress = _controller.value;
        final floatVal = _floatAnim.value;

        // 3D Perspective Rotation (Yaw and Pitch oscillation)
        final tiltY = widget.enableTilt
            ? math.sin(progress * math.pi) * 0.12 // Y-axis rotation
            : 0.0;
        final tiltX = widget.enableTilt
            ? math.cos(progress * math.pi) * 0.06 // X-axis pitch
            : 0.0;

        final transformMatrix = Matrix4.identity()
          ..setEntry(3, 2, 0.0012) // Perspective 3D
          ..rotateY(tiltY)
          ..rotateX(tiltX);

        return Stack(
          alignment: Alignment.center,
          children: [
            // Dynamic Pulsing Floor Shadow
            Container(
              width: widget.size * 0.75,
              height: widget.size * 0.12,
              margin: EdgeInsets.only(top: widget.size * 0.85),
              decoration: BoxDecoration(
                borderRadius: BorderRadius.all(
                  Radius.elliptical(widget.size * 0.75, widget.size * 0.12),
                ),
                boxShadow: [
                  BoxShadow(
                    color: AppColors.primary.withValues(
                      alpha: (0.35 + (floatVal / 50)).clamp(0.12, 0.5),
                    ),
                    blurRadius: 36 + (floatVal.abs() * 0.8),
                    spreadRadius: 6,
                  ),
                ],
              ),
            ),

            // 3D Matrix Transformed Floating Logo
            Transform(
              transform: transformMatrix,
              alignment: Alignment.center,
              child: Transform.translate(
                offset: Offset(0, floatVal),
                child: Image.asset(
                  'assets/images/app_logo.png',
                  width: widget.size,
                  height: widget.size,
                  fit: BoxFit.contain,
                ),
              ),
            ),
          ],
        );
      },
    );
  }
}
