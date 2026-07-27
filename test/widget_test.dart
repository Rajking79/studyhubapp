import 'package:flutter_test/flutter_test.dart';
import 'package:studyhubapp/main.dart';

void main() {
  testWidgets('App initialization test', (WidgetTester tester) async {
    await tester.pumpWidget(const CollegeStudyHubApp());
    expect(find.byType(CollegeStudyHubApp), findsOneWidget);
  });
}
