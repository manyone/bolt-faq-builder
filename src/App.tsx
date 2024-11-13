import React, { useState, useRef } from 'react';
import { PlusCircle, Save, Upload, Code, Copy, Check, Download, FileUp } from 'lucide-react';
import { FAQBuilder } from './components/FAQBuilder';
import { Preview } from './components/Preview';
import { CodeOutput } from './components/CodeOutput';
import { Subject } from './types';

export default function App() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const addSubject = () => {
    setSubjects([...subjects, { 
      id: Date.now(),
      title: '',
      questions: []
    }]);
  };

  const removeSubject = (subjectId: number) => {
    setSubjects(subjects.filter(s => s.id !== subjectId));
  };

  const updateSubject = (updatedSubject: Subject) => {
    setSubjects(subjects.map(s => 
      s.id === updatedSubject.id ? updatedSubject : s
    ));
  };

  const copyToClipboard = async () => {
    const codeOutput = document.querySelector('.language-html')?.textContent || '';
    await navigator.clipboard.writeText(codeOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const saveToLocalStorage = () => {
    try {
      localStorage.setItem('faqData', JSON.stringify(subjects));
      const saveButton = document.getElementById('saveButton');
      if (saveButton) {
        saveButton.classList.add('bg-green-600');
        saveButton.classList.remove('bg-blue-600');
        setTimeout(() => {
          saveButton.classList.remove('bg-green-600');
          saveButton.classList.add('bg-blue-600');
        }, 1000);
      }
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const loadFromLocalStorage = () => {
    try {
      const savedData = localStorage.getItem('faqData');
      if (savedData) {
        setSubjects(JSON.parse(savedData));
        const loadButton = document.getElementById('loadButton');
        if (loadButton) {
          loadButton.classList.add('bg-green-600');
          loadButton.classList.remove('bg-blue-600');
          setTimeout(() => {
            loadButton.classList.remove('bg-green-600');
            loadButton.classList.add('bg-blue-600');
          }, 1000);
        }
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const downloadToFile = () => {
    try {
      const data = JSON.stringify(subjects, null, 2);
      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'faq-data.json';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const content = e.target?.result as string;
          const parsedData = JSON.parse(content);
          setSubjects(parsedData);
        } catch (error) {
          console.error('Error parsing file:', error);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <div className="text-4xl font-bold text-gray-900 mb-2">FAQ Builder</div>
            <div className="text-gray-600">Create structured FAQs with subjects, questions, and detailed answers.</div>
          </div>
          <div className="flex gap-2">
            <button
              id="saveButton"
              onClick={saveToLocalStorage}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Save size={20} />
              Save to Browser
            </button>
            <button
              id="loadButton"
              onClick={loadFromLocalStorage}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Upload size={20} />
              Load from Browser
            </button>
            <button
              onClick={downloadToFile}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Download size={20} />
              Download File
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept=".json"
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <FileUp size={20} />
              Upload File
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="text-2xl font-semibold text-gray-800">Editor</div>
              <button
                onClick={addSubject}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <PlusCircle size={20} />
                Add Subject
              </button>
            </div>

            <div className="space-y-6">
              {subjects.map((subject) => (
                <FAQBuilder
                  key={subject.id}
                  subject={subject}
                  onUpdate={updateSubject}
                  onRemove={removeSubject}
                />
              ))}
            </div>
          </div>

          <div>
            <div className="sticky top-8 space-y-4">
              <div className="flex justify-between items-center">
                <div className="text-2xl font-semibold text-gray-800">
                  {showCode ? 'HTML Output' : 'Preview'}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowCode(!showCode)}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    <Code size={20} />
                    {showCode ? 'Show Preview' : 'Show HTML'}
                  </button>
                  {showCode && (
                    <button
                      onClick={copyToClipboard}
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      {copied ? <Check size={20} /> : <Copy size={20} />}
                      {copied ? 'Copied!' : 'Copy HTML'}
                    </button>
                  )}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 min-h-[400px] border border-gray-200">
                {showCode ? (
                  <CodeOutput subjects={subjects} />
                ) : (
                  <Preview subjects={subjects} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}