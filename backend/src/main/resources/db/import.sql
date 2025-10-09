INSERT INTO competition (name, link, deadline, prize, information_material, submission_forms, contact, is_active, date_created, school_year, created_by, is_relevant) VALUES
-- Austria Cyber Security Challenge
('Austria Cyber Security Challenge (ACSC)',
 'https://verbotengut.at/',
 'Anmeldung Online Qualifying Austria Cyber Security Challenge 2023 war bis 31.08. möglich. Ergebnisse noch unklar',
 'NA',
 'https://verbotengut.at/anmeldung/',
 'https://google.com',
 'office@cybersecurityaustria.at',
 true,
 '2023-09-05',
 '2324',
 'e.baar',
 true),

-- Austrian Skills
('Austrian Skills',
 'https://www.wko.at/site/skillsaustria/start.html',
 'AustrianSkills 2023 findet am 4.–7.10.2023 in Wels und 23.–26.11.2023 in Salzburg statt',
 'Gewinner kommt zum World Skills, zweiter zu Euro Skills',
 'NA',
 'NA',
 'https://www.wko.at/site/skillsaustria/whoiswho.html',
 true,
 '2023-09-05',
 '2324',
 'e.baar',
 true),

-- Fiktive Wettbewerbe
('HTL Coding Cup',
 'https://htlcodingcup.at',
 '31.12.2025',
 'Sachpreise und Praktika bei IT-Firmen',
 'https://htlcodingcup.at/downloads/broschuere.pdf',
 'https://htlcodingcup.at/anmeldung',
 'kontakt@htlcodingcup.at',
 true,
 '2025-07-07',
 '2425',
 'e.baar',
 false),

('European Robotics Competition',
 'https://robotics-europe.org',
 '15.08.2025',
 'Teilnahme an der World Robotics Championship',
 'https://robotics-europe.org/info',
 'https://robotics-europe.org/register',
 'support@robotics-europe.org',
 true,
 '2025-07-07',
 '2425',
 'e.baar',
 true),

('Young Engineers Challenge',
 'https://youngengineers.at',
 '01.09.2025',
 'Stipendium für technische Studiengänge',
 'https://youngengineers.at/broschuere.pdf',
 'https://youngengineers.at/formular',
 'info@youngengineers.at',
 false,
 '2025-04-07',
 '2425',
 'e.baar',
 false);


INSERT INTO project (competition_id, name, status, next_step, contributors) VALUES
-- Projekte für Austria Cyber Security Challenge (ID vermutlich 1)
(1, 'Secure Login System', 'In Bearbeitung', 'Abschließender Sicherheitstest', 'Anna Meier, Lukas Schwarz'),
(1, 'Phishing Awareness Kampagne', 'Abgeschlossen', 'Ergebnisse präsentieren', 'Tom Huber, Sophie Klein'),

-- Projekte für Austrian Skills (ID vermutlich 2)
(2, 'CNC Fräsmodul', 'In Bearbeitung', 'Prototyp testen', 'Max Berger, Julia Gruber'),
(2, '3D-Druck Wettbewerbsobjekt', 'Idee eingereicht', 'Material beschaffen', 'Stefan Hofer'),

-- Projekte für HTL Coding Cup (ID vermutlich 3)
(3, 'Quiz-App für HTL Schüler', 'Abgeschlossen', 'Veröffentlichung im Play Store', 'Nina Wolf, Paul Leitner'),

-- Projekte für European Robotics Competition (ID vermutlich 4)
(4, 'Autonomer Linienfolger', 'In Bearbeitung', 'Kalibrierung optimieren', 'Fabian Bauer, Elena Fuchs'),

-- Projekte für Young Engineers Challenge (ID vermutlich 5)
(5, 'Energieeffizientes Minihaus', 'Idee eingereicht', 'Pläne finalisieren', 'Laura Steiner, Markus Weber');
