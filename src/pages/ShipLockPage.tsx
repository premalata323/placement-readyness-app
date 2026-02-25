import React, { useState, useEffect } from 'react';
import { 
  getCompletedCount, 
  getProgressPercentage, 
  isAllTestsCompleted 
} from '../lib/test-storage';
import '../styles/global.css';

const ShipLockPage: React.FC = () => {
  const [completedCount, setCompletedCount] = useState(0);
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [allTestsPassed, setAllTestsPassed] = useState(false);

  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = () => {
    const completed = getCompletedCount();
    const percentage = getProgressPercentage();
    const allPassed = isAllTestsCompleted();
    
    setCompletedCount(completed);
    setProgressPercentage(percentage);
    setAllTestsPassed(allPassed);
  };

  const handleProceedToShipping = () => {
    if (allTestsPassed) {
      // In a real implementation, this would navigate to the actual shipping page
      alert('✅ All tests passed! Ready for shipping.\n\nIn a production environment, this would proceed to the deployment/release process.');
    }
  };

  const handleGoToTestChecklist = () => {
    window.location.href = '/prp/07-test';
  };

  if (allTestsPassed) {
    return (
      <div className="page-container">
        <div className="content-wrapper">
          <div className="card success-card">
            <div className="card-content text-center">
              <div className="success-icon">🎉</div>
              <h1 className="success-title">Ready for Shipping!</h1>
              <p className="success-message">
                All {completedCount} tests have been completed successfully. 
                The Placement Readiness Platform is ready for deployment.
              </p>
              
              <div className="progress-display mt-6">
                <div className="progress-circle completed">
                  <span className="progress-text">{completedCount}/{completedCount}</span>
                </div>
                <p className="progress-label">All Tests Passed</p>
              </div>

              <div className="action-buttons mt-8">
                <button 
                  onClick={handleProceedToShipping}
                  className="btn btn-primary btn-lg"
                >
                  Deploy to Production
                </button>
                
                <button 
                  onClick={handleGoToTestChecklist}
                  className="btn btn-secondary"
                >
                  Review Test Results
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="content-wrapper">
        {/* Lock Screen Header */}
        <div className="page-header text-center">
          <div className="lock-icon">🔒</div>
          <h1>Shipping Locked</h1>
          <p className="page-subtitle">
            Complete all required tests before proceeding with deployment
          </p>
        </div>

        {/* Progress Display */}
        <div className="card mb-6">
          <div className="card-header">
            <h2 className="card-title">Current Progress</h2>
          </div>
          <div className="card-content">
            <div className="progress-display">
              <div className="progress-circle">
                <span className="progress-text">{completedCount}/10</span>
              </div>
              <div className="progress-bar-container mt-4">
                <div 
                  className="progress-bar"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <p className="progress-label mt-2">{progressPercentage}% Complete</p>
            </div>
            
            <div className="warning-banner mt-6">
              <span className="warning-icon">⚠️</span>
              <span className="warning-text">Fix issues before shipping.</span>
            </div>
          </div>
        </div>

        {/* Requirements */}
        <div className="card mb-6">
          <div className="card-header">
            <h2 className="card-title">Requirements</h2>
          </div>
          <div className="card-content">
            <ul className="requirements-list">
              <li>✓ JD required validation works</li>
              <li>✓ Short JD warning shows for &lt;200 chars</li>
              <li>✓ Skills extraction groups correctly</li>
              <li>✓ Round mapping changes based on company + skills</li>
              <li>✓ Score calculation is deterministic</li>
              <li>✓ Skill toggles update score live</li>
              <li>✓ Changes persist after refresh</li>
              <li>✓ History saves and loads correctly</li>
              <li>✓ Export buttons copy the correct content</li>
              <li>✓ No console errors on core pages</li>
            </ul>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="action-buttons">
          <button 
            onClick={handleGoToTestChecklist}
            className="btn btn-primary btn-lg"
          >
            Complete Required Tests
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShipLockPage;