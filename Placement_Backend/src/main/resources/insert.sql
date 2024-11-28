-- Clear the organisation table to avoid duplicates
DELETE FROM organisation;

-- Insert data into organisation table
INSERT INTO organisation (id, name, address) VALUES
(1, 'Tech Solutions Inc.', '123 Silicon Valley, CA'),
(2, 'Innovative Minds Ltd.', '456 Tech Park, NY'),
(3, 'Global Engineers Pvt. Ltd.', '789 Industrial Zone, TX'),

-- Clear the placement table to avoid duplicates
DELETE FROM placement;

-- Insert data into placement table
INSERT INTO placement (id, organisation, profile, description, intake, minimum_grade) VALUES
-- Rows corresponding to the first 3 organisations
(1, 'Tech Solutions Inc.', 'Software Developer', 'Develop and maintain software applications.', 5, 7.5),
(2, 'Innovative Minds Ltd.', 'Data Analyst', 'Analyze and interpret complex datasets.', 3, 8.0),
(3, 'Global Engineers Pvt. Ltd.', 'Mechanical Engineer', 'Design and oversee manufacturing processes.', 4, 7.0),

INSERT INTO employee (first_name, last_name, email, password, title, photograph_path, department) VALUES
    ('John', 'Doe', 'john.doe@example.com', 'password123', 'Software Engineer', '/images/john_doe.jpg', 'Outreach'),
    ('Jane', 'Smith', 'jane.smith@example.com', 'password123', 'Data Analyst', '/images/jane_smith.jpg', 'Outreach'),
    ('Alice', 'Johnson', 'alice.johnson@example.com', 'password123', 'Product Manager', '/images/alice_johnson.jpg', 'Marketing'),
    ('Bob', 'Brown', 'bob.brown@example.com', 'password123', 'HR Specialist', '/images/bob_brown.jpg', 'Human Resources'),
    ('Charlie', 'Davis', 'charlie.davis@example.com', 'password123', 'IT Support Specialist', '/images/charlie_davis.jpg', 'IT Support');


-- Clear the student table to avoid duplicates
DELETE FROM student;

-- Insert data into student table
INSERT INTO student (student_id, roll_number, first_name, last_name, email, cgpa, total_credits, graduation_year, domain, specialisation, placement_id) VALUES
--sample 20 entries
(101, 'B2024001', 'John', 'Doe', 'john.doe@example.com', 8.5, 120, 2024, 'Engineering', 'Software Engineering', 1),
(102, 'B2024002', 'Jane', 'Smith', 'jane.smith@example.com', 9.0, 115, 2024, 'Engineering', 'Data Science', 1),
(103, 'B2024003', 'Alice', 'Johnson', 'alice.johnson@example.com', 7.8, 110, 2024, 'Engineering', 'Mechanical Engineering', 2),
(104, 'B2024004', 'Bob', 'Williams', 'bob.williams@example.com', 8.2, 125, 2024, 'Engineering', 'Cloud Computing', 1),
(105, 'B2024005', 'Charlie', 'Brown', 'charlie.brown@example.com', 7.5, 118, 2024, 'Engineering', 'Data Analytics', 2),
(106, 'B2024006', 'Emma', 'Davis', 'emma.davis@example.com', 8.3, 112, 2024, 'Engineering', 'Artificial Intelligence', 3),
(107, 'B2024007', 'Liam', 'Martinez', 'liam.martinez@example.com', 8.1, 120, 2024, 'Engineering', 'Cybersecurity', 2),
(108, 'B2024008', 'Sophia', 'Garcia', 'sophia.garcia@example.com', 7.9, 105, 2024, 'Engineering', 'Mechanical Engineering', 3),
(109, 'B2024009', 'Oliver', 'Miller', 'oliver.miller@example.com', 8.7, 130, 2024, 'Engineering', 'Software Engineering', 1),
(110, 'B2024010', 'Ava', 'Wilson', 'ava.wilson@example.com', 8.0, 122, 2024, 'Engineering', 'Data Science', 2),
(111, 'B2024011', 'Ethan', 'Moore', 'ethan.moore@example.com', 7.6, 115, 2024, 'Engineering', 'Cloud Computing', 1),
(112, 'B2024012', 'Mia', 'Taylor', 'mia.taylor@example.com', 8.4, 117, 2024, 'Engineering', 'AI and ML', 3),
(113, 'B2024013', 'Noah', 'Anderson', 'noah.anderson@example.com', 8.9, 125, 2024, 'Engineering', 'Cybersecurity', 2),
(114, 'B2024014', 'Isabella', 'Thomas', 'isabella.thomas@example.com', 7.8, 110, 2024, 'Engineering', 'Data Analytics', 3),
(115, 'B2024015', 'James', 'Jackson', 'james.jackson@example.com', 7.7, 108, 2024, 'Engineering', 'Software Development', 1);

INSERT INTO placement_student (id, placement_id, student_id, cv_application, about, acceptance, comments, date) VALUES
--sample data
(1, 1, 101, 'CV of Student 101', 'Passionate about software development.', FALSE, 'Strong candidate.', '2024-11-20'),
(2, 1, 102, 'CV of Student 102', 'Experienced in Java and Python.', FALSE, 'Needs improvement.', '2024-11-21'),
(3, 1, 103, 'CV of Student 103', 'Good problem-solving skills.', FALSE, 'Recommended for next round.', '2024-11-22'),
(4, 1, 104, 'CV of Student 104', 'Worked on cloud projects.', FALSE, 'Great potential.', '2024-11-23'),
(5, 2, 101, 'CV of Student 101', 'Interested in data analytics.', FALSE, 'Excellent data skills.', '2024-11-24'),
(6, 2, 102, 'CV of Student 102', 'Proficient in R and Tableau.', FALSE, 'Highly skilled.', '2024-11-25'),
(7, 2, 105, 'CV of Student 105', 'Strong analytical background.', FALSE, 'Needs further training.', '2024-11-26'),
(8, 2, 106, 'CV of Student 106', 'Good understanding of algorithms.', FALSE, 'Suitable for analytics.', '2024-11-27'),
(9, 3, 103, 'CV of Student 103', 'Great mechanical aptitude.', FALSE, 'Recommended for final round.', '2024-11-28'),
(10, 3, 107, 'CV of Student 107', 'Proficient in CAD tools.', FALSE, 'Excellent skills.', '2024-11-29'),
(11, 3, 104, 'CV of Student 104', 'Strong in prototyping.', FALSE, 'Potential candidate.', '2024-11-30'),
(12, 3, 108, 'CV of Student 108', 'Hands-on experience in design.', FALSE, 'Highly recommended.', '2024-12-01'),
(13, 1, 109, 'CV of Student 109', 'Strong in coding.', FALSE, 'Versatile skill set.', '2024-12-02'),
(14, 2, 110, 'CV of Student 110', 'Good with data visualization.', FALSE, 'Capable for the role.', '2024-12-03'),
(15, 3, 105, 'CV of Student 105', 'Creative thinker.', FALSE, 'Good interdisciplinary skills.', '2024-12-04'),
(16, 1, 106, 'CV of Student 106', 'Worked on team projects.', FALSE, 'Great collaboration skills.', '2024-12-05'),
(17, 2, 107, 'CV of Student 107', 'Strong domain expertise.', FALSE, 'Promising candidate.', '2024-12-06'),
(18, 3, 101, 'CV of Student 101', 'Good understanding of mechanical processes.', FALSE, 'Ready for next stage.', '2024-12-07'),
(19, 1, 108, 'CV of Student 108', 'Quick learner.', FALSE, 'Recommended for interview.', '2024-12-08'),
(20, 2, 109, 'CV of Student 109', 'Eager to learn.', FALSE, 'Potential future leader.', '2024-12-09');