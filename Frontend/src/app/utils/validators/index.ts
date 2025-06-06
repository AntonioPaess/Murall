import validator from 'validator';

export const isValidDomain = (domain: string): boolean => {
    const cleanedDomain = domain.replace(/^https?:\/\//i, '').split('/')[0];

    return validator.isFQDN(cleanedDomain, {
        require_tld: true,
        allow_underscores: false,
        allow_trailing_dot: false,
    });
};