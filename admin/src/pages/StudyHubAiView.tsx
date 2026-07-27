import React, { useState } from 'react';
import { AiConfig } from '../types';
import { Bot, Save, Sparkles, MessageSquare } from 'lucide-react';

interface StudyHubAiViewProps {
  config: AiConfig;
  onSaveConfig: (cfg: AiConfig) => void;
}

export const StudyHubAiView: React.FC<StudyHubAiViewProps> = ({
  config,
  onSaveConfig
}) => {
  const [dailyFree, setDailyFree] = useState(config.dailyFreeLimit);
  const [premiumLimit, setPremiumLimit] = useState(config.premiumLimit);
  const [enabled, setEnabled] = useState(config.isEnabled);
  const [prompt, setPrompt] = useState(config.modelPromptConfig);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveConfig({
      dailyFreeLimit: dailyFree,
      premiumLimit: premiumLimit,
      isEnabled: enabled,
      modelPromptConfig: prompt,
      totalQuestionsAnswered: config.totalQuestionsAnswered
    });
    alert('✅ StudyHub AI Assistant Rules & Prompt Config Saved!');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-extrabold text-slate-900 font-['Outfit']">StudyHub AI Assistant Manager</h2>
        <p className="text-xs text-slate-500">Configure AI daily usage limits, system prompt rules, and model suggestions</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <form onSubmit={handleSubmit} className="saas-card p-6 lg:col-span-2 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 font-['Outfit'] flex items-center gap-2">
            <Bot className="w-5 h-5 text-[#2563EB]" />
            <span>AI Configuration & System Prompt</span>
          </h3>

          <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-xl">
            <div>
              <h4 className="text-xs font-bold text-slate-900">Enable StudyHub AI Tutor</h4>
              <p className="text-[11px] text-slate-500">Allows mobile app students to chat with AI tutor</p>
            </div>
            <input
              type="checkbox"
              checked={enabled}
              onChange={(e) => setEnabled(e.target.checked)}
              className="w-5 h-5 accent-[#2563EB] cursor-pointer"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700">Daily Free User Limit</label>
              <input
                type="number"
                value={dailyFree}
                onChange={(e) => setDailyFree(Number(e.target.value))}
                className="w-full mt-1 p-2.5 border border-slate-200 rounded-xl text-xs outline-none focus:border-[#2563EB]"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700">Daily Premium User Limit</label>
              <input
                type="number"
                value={premiumLimit}
                onChange={(e) => setPremiumLimit(Number(e.target.value))}
                className="w-full mt-1 p-2.5 border border-slate-200 rounded-xl text-xs outline-none focus:border-[#2563EB]"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700">AI Tutor System Prompt Directive</label>
            <textarea
              rows={4}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full mt-1 p-2.5 border border-slate-200 rounded-xl text-xs outline-none focus:border-[#2563EB]"
            />
          </div>

          <button
            type="submit"
            className="px-4 py-2.5 bg-[#2563EB] hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-500/20 flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save AI Settings</span>
          </button>
        </form>

        <div className="saas-card p-6 lg:col-span-1 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 font-['Outfit']">AI Performance Analytics</h3>
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl space-y-1">
            <span className="text-[11px] font-bold text-blue-600 uppercase">Total Answered Questions</span>
            <h4 className="text-2xl font-extrabold text-slate-900 font-['Outfit']">
              {config.totalQuestionsAnswered.toLocaleString()}
            </h4>
            <p className="text-[10px] text-slate-500">99.4% Accuracy Rating by Students</p>
          </div>
        </div>
      </div>
    </div>
  );
};
