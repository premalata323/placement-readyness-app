import React, { useState, useEffect } from 'react';
import { 
  getTestChecklist, 
  updateTestItem, 
  resetTestChecklist, 
  getCompletedCount, 
  getProgressPercentage,
  type TestItem 
} from '../lib/test-storage';
import '../styles/global.css';

const TestChecklistPage: React.FC = () => {
  const [testItems, setTestItems] = useState<TestItem[]>([]);
  const [completedCount, setCompletedCount] = useState(0);
  const [progressPercentage, setProgressPercentage] = useState(0);

  useEffect(() => {
    loadChecklist();
  }, []);

  const loadChecklist = () => {
    const checklist = getTestChecklist();
    setTestItems(checklist.items);
    setCompletedCount(getCompletedCount());
    setProgressPercentage(getProgressPercentage());
  };

  const handleTestToggle = (id: string, completed: boolean) => {
    updateTestItem(id, completed);
    loadChecklist(); // Refresh the state
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all test progress?')) {
      resetTestChecklist();
      loadChecklist();
    }
  };

  const allTestsCompleted = completedCount === testItems.length;

  return (
    <div className="page-container">
      <div className="content-wrapper">
        {/* Header */}
        <div className="page-header">
          <h1>Test Checklist</h1>
          <p className="page-subtitle">
            Verify all functionality before shipping the Placement Readiness Platform
          </p>
        </div>

        {/* Progress Summary */}
        <div className="card mb-6">
          <div className="card-header">
            <h2 className="card-title">Progress Summary</h2>
          </div>
          <div className="card-content">
            <div className="progress-summary">
              <div className="progress-text">
                <span className="progress-count">{completedCount} / {testItems.length}</span>
                <span className="progress-label">Tests Passed</span>
              </div>
              <div className="progress-bar-container">
                <div 
                  className="progress-bar"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <div className="progress-percentage">{progressPercentage}%</div>
            </div>
            
            {!allTestsCompleted && (
              <div className="warning-banner mt-4">
                <span className="warning-icon">⚠️</span>
                <span className="warning-text">Fix issues before shipping.</span>
              </div>
            )}
          </div>
        </div>

        {/* Test Items */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Required Tests</h2>
          </div>
          <div className="card-content">
            <div className="test-items-container">
              {testItems.map((item) => (
                <div key={item.id} className="test-item">
                  <div className="test-item-header">
                    <label className="checkbox-container">
                      <input
                        type="checkbox"
                        checked={item.completed}
                        onChange={(e) => handleTestToggle(item.id, e.target.checked)}
                        className="checkbox-input"
                      />
                      <span className="checkbox-checkmark"></span>
                      <span className="test-item-title">{item.title}</span>
                    </label>
                  </div>
                  
                  <div className="test-item-description">
                    {item.description}
                  </div>
                  
                  <div className="test-item-hint">
                    <span className="hint-label">How to test:</span>
                    <span className="hint-text">{item.howToTest}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="action-buttons mt-6">
          <button 
            onClick={handleReset}
            className="btn btn-secondary"
          >
            Reset Checklist
          </button>
          
          <a 
            href="/prp/08-ship" 
            className={`btn ${allTestsCompleted ? 'btn-primary' : 'btn-disabled'}`}
          >
            {allTestsCompleted ? 'Proceed to Shipping' : 'Shipping Locked'}
          </a>
        </div>
      </div>
    </div>
  );
};

export default TestChecklistPage;