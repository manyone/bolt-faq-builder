import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Subject } from '../types';

interface PreviewProps {
  subjects: Subject[];
}

interface ExpandedState {
  [key: number]: boolean;
}

export function Preview({ subjects }: PreviewProps) {
  const [expandedQuestions, setExpandedQuestions] = useState<ExpandedState>({});

  const toggleQuestion = (questionId: number) => {
    setExpandedQuestions(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  if (subjects.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        Add subjects and questions to see the preview
      </div>
    );
  }

  return (
    <div id="preview" className="space-y-8">
      {subjects.map((subject) => (
        <div key={subject.id} className="space-y-4">
          {subject.title && (
            <div className="text-2xl font-bold text-gray-900">{subject.title}</div>
          )}
          
          <div className="space-y-6">
            {subject.questions.map((question, qIndex) => (
              <div key={question.id} className="space-y-2">
                {question.text && (
                  <div className="flex items-start gap-2">
                    <div className="flex-1 text-lg font-semibold text-gray-800">
                      {qIndex + 1}. {question.text}
                    </div>
                    <button
                      onClick={() => toggleQuestion(question.id)}
                      className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                      aria-label={expandedQuestions[question.id] ? "Collapse answer" : "Expand answer"}
                    >
                      {expandedQuestions[question.id] ? (
                        <ChevronUp size={20} className="text-gray-600" />
                      ) : (
                        <ChevronDown size={20} className="text-gray-600" />
                      )}
                    </button>
                  </div>
                )}
                
                {expandedQuestions[question.id] && (
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="space-y-2 pl-6">
                      {question.paragraphs.map((paragraph, pIndex) => (
                        <div key={pIndex} className="flex gap-2">
                          <span className="text-gray-500">•</span>
                          <div className="text-gray-600">{paragraph}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}