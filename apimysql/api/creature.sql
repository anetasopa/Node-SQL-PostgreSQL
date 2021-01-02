CREATE TABLE wizards(
    name CHARACTER varying(50),
    POWER CHARACTER varying(50),
);

CREATE TABLE elves(
    name CHARACTER varying(50),
    speed real,
);

CREATE TABLE hobbits(
    name CHARACTER varying(50),
    personality CHARACTER varying(50),
);

CREATE TABLE allies(
    wizard CHARACTER varying(50),
    elf CHARACTER varying(50)
);

CREATE TABLE guardians(
    elf CHARACTER varying(50),
    hobbit CHARACTER varying(50)
);

INSERT INTO wizards(name, power)
VALUES
('Lala', 'fireworks'),
('Kala', 'rings'),
('Bala', 'betrayal')

INSERT INTO elves(name, speed)
VALUES
('Kula', 10),
('Kila', 30),
('Lula', 5)

INSERT INTO hobbits(name, personality)
VALUES
('Frodo', 'careful'),
('Bob', 'brave'),
('Bilbo', 'greedy')

INSERT INTO allies(wizard, elf)
VALUES
('Lala', 'Kula'),
('Kala', 'Kila'),
('Bala', 'Lula'),
('Lala', 'Lula')

INSERT INTO guardians(elf, hobbit)
VALUES
('Kula', 'Frodo'),
('Kila', 'Bob'),
('Lula', 'Frodo')

SELECT * FROM allies;

SELECT * FROM guardians;

SELECT name FROM wizards LIMIT 2;

SELECT * FROM guardians JOIN elves;

SELECT * FROM guardians JOIN elves ON allies.elf = elves.name;

SELECT * FROM allies JOIN elves ON allies.elf = elves.name;

SELECT * FROM guardians JOIN hobbits ON guardians.hobbit = hobbits.name;

SELECT * FROM guardians JOIN hobbits ON guardians.hobbit = hobbits.name JOIN elves ON guardians.elf = elves.name;