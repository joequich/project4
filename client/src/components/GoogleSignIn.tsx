import React, {useEffect, useState } from 'react';
import { useAppDispatch } from '../hooks/Redux';
import { googleSignIn } from '../redux/auth/authAction';
import { clearState } from '../redux/auth/authSlide';

export const GoogleSignIn = React.memo(() => {
    console.log('googlesignin render');
    const dispatch = useAppDispatch();
    const [isMounted, setIsMounted] = useState(false);
    
    useEffect(() => {
        if (isMounted) return;
        
        const handleCredentialResponse = (resp: CredentialResponse) => {
            if (!resp.clientId || !resp.credential) return;
            dispatch(clearState());
            dispatch(googleSignIn({ idToken: resp.credential }));
        };
        
        const initGsiButton = () => {
            if (!window.google || isMounted) return;
            
            const { google } = window;
            
            setIsMounted(true);
            google.accounts.id.initialize({
                client_id:
                '812157899128-oe9th8r0c05ikbnmrp91ndujvfvlpdvs.apps.googleusercontent.com',
                callback: handleCredentialResponse,
            });
            google.accounts.id.renderButton(
                document.getElementById('btn-google')!,
                {
                    type: 'standard',
                    theme: 'outline',
                    size: 'large',
                    shape: 'rectangular',
                    text: 'continue_with',
                    logo_alignment: 'left',
                    width: '304',
                }
                );
            };
            
            const script = document.createElement('script');
            script.src = 'https://accounts.google.com/gsi/client';
            script.onload = initGsiButton;
            script.async = true;
            script.id = 'google-script';
            document.querySelector('body')?.appendChild(script);
            
            return () => {
                window.google?.accounts.id.cancel();
                document.getElementById('google-script')?.remove();
            };
        }, [isMounted, dispatch]);

    return <button id="btn-google" className={'btn g_id_signin'} />;
});
