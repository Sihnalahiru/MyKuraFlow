-- Rotate the three invited learner passwords to simple, distinct passwords.
-- Passwords are PBKDF2-SHA256 hashes; plaintext is never stored in D1.
UPDATE users SET password_salt='pEo64tJPAP+1QdX66xnaiw==',password_hash='BCk4x/hvmTZ+1XwyyKLr390ppG8fPnwxMpskx0ouuow=',password_iterations=310000 WHERE username='sakura';
UPDATE users SET password_salt='srSNLEK2VQ5KHAsb0+IW/g==',password_hash='IInLW75TPFduKTVpRmaqoXzjZKX4hmToevQyYM26ygM=',password_iterations=310000 WHERE username='hina';
UPDATE users SET password_salt='3PPQFiPh72opCGGbf5cG+Q==',password_hash='cICpWkp9RaPH9X0+Iqz1UHG9L0y6JLdvIfWR6Lzs3IE=',password_iterations=310000 WHERE username='haruto';
