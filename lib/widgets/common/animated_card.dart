import 'package:flutter/material.dart';

class AnimatedCard extends StatefulWidget {
  final Widget child;
  final VoidCallback? onTap;
  final EdgeInsetsGeometry? padding;
  final EdgeInsetsGeometry? margin;
  final BoxDecoration? decoration;

  const AnimatedCard({
    super.key,
    required this.child,
    this.onTap,
    this.padding,
    this.margin,
    this.decoration,
  });

  @override
  State<AnimatedCard> createState() => _AnimatedCardState();
}

class _AnimatedCardState extends State<AnimatedCard> {
  bool _isPressed = false;

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: widget.margin,
      child: GestureDetector(
        onTapDown: (_) {
          if (widget.onTap != null) setState(() => _isPressed = true);
        },
        onTapUp: (_) {
          if (widget.onTap != null) setState(() => _isPressed = false);
        },
        onTapCancel: () {
          if (widget.onTap != null) setState(() => _isPressed = false);
        },
        onTap: widget.onTap,
        child: AnimatedScale(
          scale: _isPressed ? 0.97 : 1.0,
          duration: const Duration(milliseconds: 120),
          curve: Curves.easeOutCubic,
          child: widget.decoration != null || widget.padding != null
              ? Container(
                  padding: widget.padding,
                  decoration: widget.decoration,
                  child: widget.child,
                )
              : widget.child,
        ),
      ),
    );
  }
}
