import React from 'react';
import { Subject } from '../types';

interface CodeOutputProps {
  subjects: Subject[];
}

export function CodeOutput({ subjects }: CodeOutputProps) {
  if (subjects.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        Add subjects and questions to generate HTML
      </div>
    );
  }

  const htmlOutput = subjects
    .map(
      (subject) => `
<div class="faq-subject">
  ${subject.title ? `<div class="faq-subject-title">${subject.title}</div>` : ''}
  <div class="faq-questions">
    ${subject.questions
      .map(
        (question, qIndex) => `
    <div class="faq-question">
      ${
        question.text
          ? `<div class="faq-question-header">
              <div class="faq-question-title">${qIndex + 1}. ${question.text}</div>
              <button class="faq-toggle" onclick="this.parentElement.parentElement.classList.toggle('expanded')">
                <svg class="chevron-down" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
            </div>`
          : ''
      }
      <div class="faq-answer">
        <div class="faq-paragraphs">
          ${question.paragraphs
            .map(
              (paragraph) => `
          <div class="faq-paragraph">
            <span class="bullet">•</span>
            <div class="faq-text">${paragraph}</div>
          </div>`
            )
            .join('')}
        </div>
      </div>
    </div>`
      )
      .join('')}
  </div>
</div>`
    )
    .join('');

  const fullOutput = `
<style>
.faq-subject { margin-bottom: 2rem; }
.faq-subject-title { font-size: 1.5rem; font-weight: bold; margin-bottom: 1rem; color: #111827; }
.faq-questions { display: flex; flex-direction: column; gap: 1.5rem; }
.faq-question-header { display: flex; align-items: flex-start; gap: 0.5rem; }
.faq-question-title { font-size: 1.125rem; font-weight: 600; margin-bottom: 0.5rem; flex: 1; color: #1f2937; }
.faq-toggle { background: none; border: none; padding: 0.25rem; cursor: pointer; color: #4b5563; }
.faq-toggle:hover { background-color: #f3f4f6; border-radius: 9999px; }
.faq-answer { display: none; background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 0.5rem; padding: 1rem; margin-top: 0.5rem; }
.faq-question.expanded .faq-answer { display: block; }
.faq-question.expanded .chevron-down { transform: rotate(180deg); }
.faq-paragraphs { display: flex; flex-direction: column; gap: 0.5rem; padding-left: 1.5rem; }
.faq-paragraph { display: flex; gap: 0.5rem; align-items: flex-start; }
.bullet { color: #6b7280; }
.faq-text { color: #4b5563; font-size: 1rem; line-height: 1.5; flex: 1; }
.chevron-down { transition: transform 0.2s; }
</style>
<script>
document.querySelectorAll('.faq-toggle').forEach(button => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    const question = button.closest('.faq-question');
    question.classList.toggle('expanded');
  });
});
</script>
${htmlOutput}`;

  return (
    <pre className="text-sm bg-gray-50 p-4 rounded-md overflow-x-auto">
      <code className="language-html">{fullOutput}</code>
    </pre>
  );
}