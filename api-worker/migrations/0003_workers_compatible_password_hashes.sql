-- Re-hash the three invited learner passwords at 100,000 PBKDF2 iterations.
-- Cloudflare Workers WebCrypto rejects PBKDF2 iteration counts above 100,000.
UPDATE users SET password_salt='qhV6DLb7QwrnEKteV5KpZA==',password_hash='OX6ESsXIvE+gS0y1p+TmdXkd6Tl4rxAo99U5CGHe/64=',password_iterations=100000 WHERE username='sakura';
UPDATE users SET password_salt='vSi5tmNIWpHz9EKgkChVDA==',password_hash='u731K4j4RZ5rPaMr9EGNCI32SS72S5W22Yg9NMpfEy8=',password_iterations=100000 WHERE username='hina';
UPDATE users SET password_salt='3pHlJ/k7QazDnlFeTaWg0w==',password_hash='89cxSRCl4GmholNqozF0B35uujcpCdtg4WY1CYDRydA=',password_iterations=100000 WHERE username='haruto';
