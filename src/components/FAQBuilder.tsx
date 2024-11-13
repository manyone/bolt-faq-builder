import React from 'react';
import { PlusCircle, Trash2 } from 'lucide-react';
import { Subject, Question } from '../types';

interface FAQBuilderProps {
  subject: Subject;
  onUpdate: (subject: Subject) => void;
  onRemove: (id: number) => void;
}

export function FAQBuilder({ subject, onUpdate, onRemove }: FAQBuilderProps) {
  const addQuestion = () => {
    onUpdate({
      ...subject,
      questions: [...subject.questions, { id: Date.now(), text: '', paragraphs: [''] }]
    });
  };

  const removeQuestion = (questionId: number) => {
    onUpdate({
      ...subject,
      questions: subject.questions.filter(q => q.id !== questionId)
    });
  };

  const updateQuestion = (questionId: number, updatedQuestion: Question) => {
    onUpdate({
      ...subject,
      questions: subject.questions.map(q => 
        q.id === questionId ? updatedQuestion : q
      )
    });
  };

  const addParagraph = (questionId: number) => {
    const question = subject.questions.find(q => q.id === questionId);
    if (question) {
      updateQuestion(questionId, {
        ...question,
        paragraphs: [...question.paragraphs, '']
      });
    }
  };

  const removeParagraph = (questionId: number, paragraphIndex: number) => {
    const question = subject.questions.find(q => q.id === questionId);
    if (question) {
      updateQuestion(questionId, {
        ...question,
        paragraphs: question.paragraphs.filter((_, index) => index !== paragraphIndex)
      });
    }
  };

  const updateParagraph = (questionId: number, paragraphIndex: number, text: string) => {
    const question = subject.questions.find(q => q.id === questionId);
    if (question) {
      const newParagraphs = [...question.paragraphs];
      newParagraphs[paragraphIndex] = text;
      updateQuestion(questionId, {
        ...question,
        paragraphs: newParagraphs
      });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <div className="flex items-start gap-4 mb-4">
        <input
          type="text"
          value={subject.title}
          onChange={(e) => onUpdate({ ...subject, title: e.target.value })}
          placeholder="Enter subject title"
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={() => onRemove(subject.id)}
          className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
        >
          <Trash2 size={20} />
        </button>
      </div>

      <div className="space-y-4">
        {subject.questions.map((question, qIndex) => (
          <div key={question.id} className="pl-6 border-l-2 border-gray-200">
            <div className="flex items-start gap-4 mb-2">
              <span className="text-gray-500 font-medium">{qIndex + 1}.</span>
              <input
                type="text"
                value={question.text}
                onChange={(e) => updateQuestion(question.id, { ...question, text: e.target.value })}
                placeholder="Enter question"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={() => removeQuestion(question.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
              >
                <Trash2 size={20} />
              </button>
            </div>

            <div className="pl-6 space-y-2">
              {question.paragraphs.map((paragraph, pIndex) => (
                <div key={pIndex} className="flex items-start gap-4">
                  <span className="text-gray-500 mt-3">•</span>
                  <textarea
                    value={paragraph}
                    onChange={(e) => updateParagraph(question.id, pIndex, e.target.value)}
                    placeholder="Enter paragraph"
                    rows={2}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
                  />
                  <button
                    onClick={() => removeParagraph(question.id, pIndex)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                    disabled={question.paragraphs.length === 1}
                  >
                    <Trash2 size={20} className={question.paragraphs.length === 1 ? 'opacity-50' : ''} />
                  </button>
                </div>
              ))}
              <button
                onClick={() => addParagraph(question.id)}
                className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 ml-6"
              >
                <PlusCircle size={16} />
                Add Paragraph
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={addQuestion}
        className="mt-4 flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
      >
        <PlusCircle size={16} />
        Add Question
      </button>
    </div>
  );
}