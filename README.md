# Processly: Business Process Management System (BPMS)

### University of Zanjan Final Project

---

![Processly](https://github.com/masoudsadeghiDev/Processly/blob/front-end/src/assets/bpm.jpg)

## Project Overview
**Processly** is a comprehensive and user-friendly **Business Process Management System (BPMS)** developed as a final project at University of Zanjan. This system enables organizations to design, manage, and optimize their business workflows efficiently. It incorporates an open-source Angular admin template in the frontend, providing a polished and responsive user interface for automating tasks, tracking progress, and analyzing performance metrics.

## Key Features
- **Visual Workflow Designer**: Drag-and-drop interface for creating and managing workflows.
- **Task Management**: Assign tasks to team members, set priorities, and monitor progress.
- **Automation and Notifications**: Automate recurring tasks and receive notifications for critical updates.
- **Reports and Analytics**: Generate detailed reports to evaluate process efficiency.
- **Real-time Monitoring**: Dashboard views to track workflow progress in real time.

## Getting Started

### Prerequisites
- **Java Development Kit (JDK) 8 or later**
- **Database**: Microsoft SQL Server
- **Docker** (optional, for containerized deployment)

### Installation
1. **Clone the Repository**
   ```bash
   git clone https://github.com/masoudsadeghiDev/Processly
   ```
2. **Navigate to Project Directory**
   ```bash
   cd processly
   ```
3. **Configure Database**
   - Update the `application.properties` file in `src/main/resources` with your database credentials.

4. **Build and Run**
   ```bash
   ./gradlew build
   ./gradlew bootRun
   ```

### Usage
1. Open your browser and go to `http://localhost:8080`.
2. Register a new account or log in.
3. Begin designing workflows, assigning tasks, and tracking their progress in real-time.

## Technologies Used
- **Backend**: Java, Spring Boot
- **Frontend**: Angular (with an open-source Angular admin template)
- **Database**: Microsoft SQL Server
- **Others**: Docker (for containerization)

![Dashboard](docs/images/dashboard.png)
*Screenshot: Real-time monitoring dashboard.*

## Acknowledgments
- **Frontend Template**: This project uses an open-source Angular admin template to create a responsive and professional interface.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## About the Developer
**Processly** is a final project by Masoud at University of Zanjan, showcasing skills in Java, Spring Boot, and Angular development for effective business process management.

--- 

This version includes the use of the Angular admin template in both the overview and acknowledgments sections. Let me know if you'd like further modifications!