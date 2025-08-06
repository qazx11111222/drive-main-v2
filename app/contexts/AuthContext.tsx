"use client";

import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { User } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('AuthProvider - Component mounted');
    
    let mounted = true;
    
    // 初期認証状態を取得
    const getInitialSession = async () => {
      try {
        console.log('AuthProvider - Getting initial session...');
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('AuthProvider - Error getting session:', error);
        } else {
          console.log('AuthProvider - Initial session:', session);
          console.log('AuthProvider - Initial user:', session?.user);
          console.log('AuthProvider - Session access token exists:', !!session?.access_token);
          console.log('AuthProvider - Session refresh token exists:', !!session?.refresh_token);
        }
        
        if (mounted) {
          setUser(session?.user || null);
          setLoading(false);
          console.log('AuthProvider - Loading set to false');
        }
      } catch (error) {
        console.error('AuthProvider - Error getting initial session:', error);
        if (mounted) {
          setLoading(false);
          console.log('AuthProvider - Loading set to false (error)');
        }
      }
    };

    getInitialSession();

    // 認証状態の変更を監視
    console.log('AuthProvider - Setting up auth state listener...');
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('AuthProvider - Auth state change event:', event);
        console.log('AuthProvider - Auth state change session:', session);
        console.log('AuthProvider - Auth state change user:', session?.user);
        console.log('AuthProvider - Event type:', event);
        
        if (mounted) {
          setUser(session?.user || null);
          setLoading(false);
          console.log('AuthProvider - State updated after auth change');
        }
      }
    );

    return () => {
      console.log('AuthProvider - Cleaning up subscription');
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  // デバッグ用：状態が変更されるたびにログを出力
  useEffect(() => {
    console.log('AuthProvider - State changed:', { user, loading });
  }, [user, loading]);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
} 