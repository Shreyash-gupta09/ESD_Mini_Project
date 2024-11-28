CREATE TABLE Employee (
                          employee_id BIGINT AUTO_INCREMENT PRIMARY KEY,
                          first_name VARCHAR(255),
                          last_name VARCHAR(255),
                          email VARCHAR(255) UNIQUE NOT NULL,
                          password VARCHAR(255),
                          title VARCHAR(255),
                          photograph_path VARCHAR(255),
                          department VARCHAR(255)
);


CREATE TABLE Organisation (
                              id BIGINT AUTO_INCREMENT PRIMARY KEY,
                              name VARCHAR(255) NOT NULL,
                              address VARCHAR(255)
);


CREATE TABLE Placement (
                           id BIGINT AUTO_INCREMENT PRIMARY KEY,
                           organisation VARCHAR(255) NOT NULL,
                           profile VARCHAR(255) NOT NULL,
                           description VARCHAR(255),
                           intake INT,
                           minimum_grade DOUBLE NOT NULL
);

CREATE TABLE PlacementStudent (
                                  id BIGINT AUTO_INCREMENT PRIMARY KEY,
                                  placement_id BIGINT NOT NULL,
                                  student_id BIGINT NOT NULL,
                                  cv_application VARCHAR(255),
                                  about VARCHAR(255),
                                  acceptance BOOLEAN,
                                  comments VARCHAR(255),
                                  date DATE,
                                  CONSTRAINT fk_placement FOREIGN KEY (placement_id) REFERENCES Placement(id),
                                  CONSTRAINT fk_student FOREIGN KEY (student_id) REFERENCES Student(id)
);

CREATE TABLE Student (
                         student_id BIGINT AUTO_INCREMENT PRIMARY KEY,
                         roll_number VARCHAR(255) UNIQUE NOT NULL,
                         first_name VARCHAR(255) NOT NULL,
                         last_name VARCHAR(255) NOT NULL,
                         email VARCHAR(255) UNIQUE NOT NULL,
                         cgpa DOUBLE,
                         total_credits INT,
                         graduation_year INT,
                         domain VARCHAR(255),
                         specialisation VARCHAR(255),
                         placement_id BIGINT,
                         CONSTRAINT fk_placement_student FOREIGN KEY (placement_id) REFERENCES Placement(id)
);
