import React, { useEffect, useState } from 'react';

export const GoogleSignIn = () => {
    console.log('googlesignin render');
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        if (isMounted) return;

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
    }, [isMounted]);

    const handleCredentialResponse = (resp: CredentialResponse) => {
        if (!resp.clientId || !resp.credential) return;
        console.log(resp);
    };

    return <button id="btn-google" className={'btn g_id_signin'} />;
};
