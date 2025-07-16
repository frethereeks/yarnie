"use client"

import { useState } from 'react';

export const useClipboard = () => {
    const [copied, setCopied] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const copy = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setError(null);
            setTimeout(() => setCopied(false), 1000);
        } catch (err) {
            setCopied(false);
            setError(err as Error);
        }
    };

    const paste = async () => {
        try {
            const text = await navigator.clipboard.readText();
            setError(null);
            return text;
        } catch (err) {
            setError(err as Error);
            return '';
        }
    };

    return { copied, error, copy, paste };
};