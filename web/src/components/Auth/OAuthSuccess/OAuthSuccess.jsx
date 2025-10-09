import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import vynixLogo from "../../../assets/logo/vynix.png";
import { authService } from "../../../services/authService";

const OAuthSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    const processOAuth = async () => {
      try {
        const token = searchParams.get('token');
        const userParam = searchParams.get('user');
        const errorParam = searchParams.get('error');

        if (errorParam) {
          setError(`Authentication failed: ${errorParam}`);
          setIsProcessing(false);
          return;
        }

        if (token && userParam) {
          const user = JSON.parse(decodeURIComponent(userParam));
          
          const success = authService.handleOAuthSuccess(token, user);
          
          if (success) {
            // Redirect to home after a brief delay
            setTimeout(() => {
              navigate('/');
            }, 2000);
          } else {
            setError('Failed to process authentication data');
          }
        } else {
          setError('Authentication failed. Missing token or user data.');
        }
      } catch (err) {
        console.error('OAuth success error:', err);
        setError('Failed to process authentication. Please try again.');
      } finally {
        setIsProcessing(false);
      }
    };

    processOAuth();
  }, [searchParams, navigate]);

  if (isProcessing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0B0B17] via-[#1A0B2E] to-[#2D0B45] flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <img src={vynixLogo} alt="Vynix" className="h-20 w-auto mx-auto mb-8" />
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-500/20 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Processing...</h2>
            <p className="text-white/60 mb-6">Completing your authentication</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B0B17] via-[#1A0B2E] to-[#2D0B45] flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <img src={vynixLogo} alt="Vynix" className="h-20 w-auto mx-auto mb-8" />
        
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8">
          {error ? (
            <>
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/20 flex items-center justify-center">
                <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Authentication Failed</h2>
              <p className="text-white/60 mb-6">{error}</p>
              <button
                onClick={() => navigate('/login')}
                className="w-full py-3 px-4 bg-gradient-to-r from-[#ff4ec0] to-[#7b2ff7] rounded-2xl font-semibold text-white hover:shadow-lg hover:shadow-[#ff4ec0]/25 transition-all duration-300"
              >
                Back to Login
              </button>
            </>
          ) : (
            <>
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Welcome to Vynix!</h2>
              <p className="text-white/60 mb-6">Authentication successful! Redirecting you...</p>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div className="bg-gradient-to-r from-[#ff4ec0] to-[#7b2ff7] h-2 rounded-full animate-pulse"></div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default OAuthSuccess;