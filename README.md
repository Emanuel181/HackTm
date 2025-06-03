<div id="top">

<!-- HEADER STYLE: CLASSIC -->
<div align="center">


# HACKTM

<em>Empowering Communities Through Data-Driven Insights</em>

<!-- BADGES -->
<img src="https://img.shields.io/github/license/Emanuel181/HackTm?style=flat&logo=opensourceinitiative&logoColor=white&color=0080ff" alt="license">
<img src="https://img.shields.io/github/last-commit/Emanuel181/HackTm?style=flat&logo=git&logoColor=white&color=0080ff" alt="last-commit">
<img src="https://img.shields.io/github/languages/top/Emanuel181/HackTm?style=flat&color=0080ff" alt="repo-top-language">
<img src="https://img.shields.io/github/languages/count/Emanuel181/HackTm?style=flat&color=0080ff" alt="repo-language-count">

<em>Built with the tools and technologies:</em>

<img src="https://img.shields.io/badge/Flask-000000.svg?style=flat&logo=Flask&logoColor=white" alt="Flask">
<img src="https://img.shields.io/badge/JSON-000000.svg?style=flat&logo=JSON&logoColor=white" alt="JSON">
<img src="https://img.shields.io/badge/Markdown-000000.svg?style=flat&logo=Markdown&logoColor=white" alt="Markdown">
<img src="https://img.shields.io/badge/npm-CB3837.svg?style=flat&logo=npm&logoColor=white" alt="npm">
<img src="https://img.shields.io/badge/Python-3776AB.svg?style=flat&logo=Python&logoColor=white" alt="Python">
<img src="https://img.shields.io/badge/TypeScript-3178C6.svg?style=flat&logo=TypeScript&logoColor=white" alt="TypeScript">

</div>
<br>

---

## 📄 Table of Contents

- [Overview](#-overview)
- [Getting Started](#-getting-started)
    - [Prerequisites](#-prerequisites)
    - [Installation](#-installation)
    - [Usage](#-usage)
    - [Testing](#-testing)
- [Features](#-features)
- [Project Structure](#-project-structure)
    - [Project Index](#-project-index)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)
- [Acknowledgment](#-acknowledgment)

---

## ✨ Overview

HackTm is a powerful developer tool designed for spatial demographic analysis, enabling users to visualize and interact with population data effectively.

**Why HackTm?**

This project aims to provide a comprehensive solution for urban data visualization and analysis. The core features include:

- 🌍 **Spatial Data Processing:** Extracts and processes population data for accurate demographic insights.
- 📊 **Interactive Frontend:** Built with Angular, offering a dynamic user interface for seamless interaction.
- 🌈 **3D Heatmap Visualization:** Utilizes Mapbox GL for immersive geographical data representation.
- 🔗 **Robust API Integration:** Flask-based backend with Firebase for efficient data management and real-time updates.
- 🗣️ **User Engagement Tools:** Features for reporting, upvoting, and commenting on community issues enhance user interaction.
- ✅ **Comprehensive Testing Framework:** Ensures reliability and maintainability through unit tests across components.

---

## 📌 Features

|      | Component       | Details                              |
| :--- | :-------------- | :----------------------------------- |
| ⚙️  | **Architecture**  | <ul><li>Microservices architecture</li><li>Frontend: Angular</li><li>Backend: Flask</li></ul> |
| 🔩 | **Code Quality**  | <ul><li>TypeScript for strong typing</li><li>ESLint for linting</li><li>Prettier for code formatting</li></ul> |
| 📄 | **Documentation** | <ul><li>README.md for project overview</li><li>API documentation via Flask-RESTx</li><li>Markdown files for guides</li></ul> |
| 🔌 | **Integrations**  | <ul><li>Firebase for authentication</li><li>Mapbox for mapping features</li><li>Lucide-angular for icons</li></ul> |
| 🧩 | **Modularity**    | <ul><li>Separation of frontend and backend</li><li>Reusable Angular components</li><li>Flask blueprints for API routes</li></ul> |
| 🧪 | **Testing**       | <ul><li>Unit tests with Jasmine and Karma</li><li>Integration tests for Flask APIs</li><li>Test coverage reports</li></ul> |
| ⚡️  | **Performance**   | <ul><li>Lazy loading in Angular</li><li>Optimized API responses</li><li>Efficient data handling with RxJS</li></ul> |
| 🛡️ | **Security**      | <ul><li>Flask-CORS for cross-origin requests</li><li>Environment variables for sensitive data</li><li>Firebase security rules</li></ul> |
| 📦 | **Dependencies**  | <ul><li>Frontend: Angular, RxJS, Zone.js</li><li>Backend: Flask, Flask-CORS, Python libraries</li><li>Package managers: npm, pip</li></ul> |
| 🚀 | **Scalability**   | <ul><li>Microservices allow independent scaling</li><li>Load balancing with Flask</li><li>Angular's modular architecture supports scaling</li></ul> |


### Explanation of the Table Components:

- **Architecture**: Highlights the use of microservices with Angular for the frontend and Flask for the backend.
- **Code Quality**: Emphasizes the use of TypeScript, ESLint, and Prettier to maintain high code quality.
- **Documentation**: Points out the presence of a README and API documentation, which are essential for onboarding and usage.
- **Integrations**: Lists key third-party services and libraries that enhance functionality.
- **Modularity**: Discusses the separation of concerns in the codebase, making it easier to manage and extend.
- **Testing**: Covers the testing framework and practices in place to ensure code reliability.
- **Performance**: Notes optimizations made for better user experience and faster load times.
- **Security**: Addresses security measures implemented to protect the application.

---

## 📁 Project Structure

```sh
└── HackTm/
    ├── PythonProject
    │   ├── .idea
    │   └── main.py
    ├── backend
    │   ├── .gitignore
    │   ├── .idea
    │   ├── app.py
    │   ├── cartiere.json
    │   ├── firebase_client.py
    │   ├── heatmap_routes.py
    │   ├── helper_routes.py
    │   ├── helpers.py
    │   ├── pdf.py
    │   ├── reportroutes.py
    │   ├── requirements.txt
    │   ├── sesizari_by_filter.py
    │   ├── sesizari_by_id.py
    │   ├── sesizari_post.py
    │   ├── sesizari_routes.py
    │   ├── subcategorii.json
    │   ├── weighted_cartiere.json
    │   ├── weighted_category.json
    │   └── weighted_subcategories.json
    └── frontend
        ├── .editorconfig
        ├── .gitignore
        ├── .vscode
        ├── README.md
        ├── angular.json
        ├── package-lock.json
        ├── package.json
        ├── public
        ├── src
        ├── tsconfig.app.json
        ├── tsconfig.json
        └── tsconfig.spec.json
```

---

### 📑 Project Index

<details open>
	<summary><b><code>HACKTM/</code></b></summary>
	<!-- __root__ Submodule -->
	<details>
		<summary><b>__root__</b></summary>
		<blockquote>
			<div class='directory-path' style='padding: 8px 0; color: #666;'>
				<code><b>⦿ __root__</b></code>
			<table style='width: 100%; border-collapse: collapse;'>
			<thead>
				<tr style='background-color: #f8f9fa;'>
					<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
					<th style='text-align: left; padding: 8px;'>Summary</th>
				</tr>
			</thead>
			</table>
		</blockquote>
	</details>
	<!-- PythonProject Submodule -->
	<details>
		<summary><b>PythonProject</b></summary>
		<blockquote>
			<div class='directory-path' style='padding: 8px 0; color: #666;'>
				<code><b>⦿ PythonProject</b></code>
			<table style='width: 100%; border-collapse: collapse;'>
			<thead>
				<tr style='background-color: #f8f9fa;'>
					<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
					<th style='text-align: left; padding: 8px;'>Summary</th>
				</tr>
			</thead>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/HackTm/blob/master/PythonProject/main.py'>main.py</a></b></td>
					<td style='padding: 8px;'>- Extracts and processes population data for Timișoara by loading a comprehensive dataset of Romanias population and the citys geographical boundaries<br>- It ensures both datasets share the same coordinate reference system, applies a spatial filter to isolate the population within Timișoara, and outputs the results as a GeoJSON file for further analysis or visualization<br>- This functionality is integral to the project's goal of spatial demographic analysis.</td>
				</tr>
			</table>
		</blockquote>
	</details>
	<!-- frontend Submodule -->
	<details>
		<summary><b>frontend</b></summary>
		<blockquote>
			<div class='directory-path' style='padding: 8px 0; color: #666;'>
				<code><b>⦿ frontend</b></code>
			<table style='width: 100%; border-collapse: collapse;'>
			<thead>
				<tr style='background-color: #f8f9fa;'>
					<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
					<th style='text-align: left; padding: 8px;'>Summary</th>
				</tr>
			</thead>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/HackTm/blob/master/frontend/package.json'>package.json</a></b></td>
					<td style='padding: 8px;'>- Defines the configuration and dependencies for the frontend of the project, utilizing Angular as the primary framework<br>- It facilitates the development process by providing scripts for building, serving, and testing the application<br>- The inclusion of various Angular libraries and tools ensures a robust user interface and enhances functionality, contributing to a cohesive architecture that supports dynamic web applications.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/HackTm/blob/master/frontend/tsconfig.json'>tsconfig.json</a></b></td>
					<td style='padding: 8px;'>- Configuration settings define the TypeScript and Angular compiler options for the frontend of the project<br>- By enforcing strict type-checking and module resolution, these settings enhance code quality and maintainability<br>- Additionally, they facilitate internationalization and support various file types, ensuring a robust development environment that aligns with modern JavaScript standards and best practices.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/HackTm/blob/master/frontend/angular.json'>angular.json</a></b></td>
					<td style='padding: 8px;'>- Configuration settings define the structure and behavior of the Angular frontend application within the project<br>- It specifies project details, build options, and development configurations, ensuring a streamlined development process<br>- By managing assets, styles, and scripts, it facilitates the integration of various components and optimizes performance for both production and development environments, contributing to a cohesive user experience across the application.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/HackTm/blob/master/frontend/.editorconfig'>.editorconfig</a></b></td>
					<td style='padding: 8px;'>- Defines editor configuration settings to ensure consistent coding styles across the project<br>- By specifying parameters such as character encoding, indentation style, and whitespace management, it promotes a uniform development environment<br>- This enhances collaboration among team members and streamlines the code review process, ultimately contributing to the overall quality and maintainability of the codebase.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/HackTm/blob/master/frontend/README.md'>README.md</a></b></td>
					<td style='padding: 8px;'>- Frontend development is streamlined through the use of Angular CLI, enabling efficient local server setup, code scaffolding, and project building<br>- The architecture supports dynamic application updates and performance optimization, while also facilitating unit and end-to-end testing<br>- This structure empowers developers to create, test, and deploy robust Angular applications effectively, enhancing overall productivity and code quality within the project.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/HackTm/blob/master/frontend/tsconfig.app.json'>tsconfig.app.json</a></b></td>
					<td style='padding: 8px;'>- Configures TypeScript settings for the Angular application, ensuring proper compilation and output management<br>- By extending the base TypeScript configuration, it specifies the output directory for compiled files and includes necessary type definitions<br>- This setup facilitates the development process by streamlining the integration of TypeScript within the broader architecture of the frontend codebase, enhancing maintainability and scalability.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/HackTm/blob/master/frontend/tsconfig.spec.json'>tsconfig.spec.json</a></b></td>
					<td style='padding: 8px;'>- Configures TypeScript settings for unit testing within the Angular frontend application<br>- By extending the base TypeScript configuration, it specifies output directories for compiled test files and includes necessary type definitions for Jasmine<br>- This setup ensures that all test specifications and type declarations are properly recognized, facilitating a streamlined testing process and enhancing code quality across the project.</td>
				</tr>
			</table>
			<!-- src Submodule -->
			<details>
				<summary><b>src</b></summary>
				<blockquote>
					<div class='directory-path' style='padding: 8px 0; color: #666;'>
						<code><b>⦿ frontend.src</b></code>
					<table style='width: 100%; border-collapse: collapse;'>
					<thead>
						<tr style='background-color: #f8f9fa;'>
							<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
							<th style='text-align: left; padding: 8px;'>Summary</th>
						</tr>
					</thead>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/HackTm/blob/master/frontend/src/index.html'>index.html</a></b></td>
							<td style='padding: 8px;'>- Serves as the foundational HTML document for the CitySense application, establishing the primary structure and metadata necessary for rendering the frontend<br>- It defines essential elements such as character encoding, viewport settings, and links to stylesheets, ensuring a responsive and visually appealing user interface<br>- This document acts as the entry point for the Angular application, facilitating seamless integration of components and resources.</td>
						</tr>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/HackTm/blob/master/frontend/src/main.ts'>main.ts</a></b></td>
							<td style='padding: 8px;'>- Bootstraps the Angular application by initializing the main component and configuring essential providers, including routing and HTTP services<br>- It establishes the foundational setup for the frontend architecture, ensuring seamless navigation and data handling<br>- This setup is crucial for delivering a responsive user experience and integrating various application features effectively within the overall project structure.</td>
						</tr>
					</table>
					<!-- environments Submodule -->
					<details>
						<summary><b>environments</b></summary>
						<blockquote>
							<div class='directory-path' style='padding: 8px 0; color: #666;'>
								<code><b>⦿ frontend.src.environments</b></code>
							<table style='width: 100%; border-collapse: collapse;'>
							<thead>
								<tr style='background-color: #f8f9fa;'>
									<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
									<th style='text-align: left; padding: 8px;'>Summary</th>
								</tr>
							</thead>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/HackTm/blob/master/frontend/src/environments/environments.ts'>environments.ts</a></b></td>
									<td style='padding: 8px;'>- Defines the environment configuration for the frontend application, indicating whether the application is in production mode and specifying the base API URL for backend interactions<br>- This setup is crucial for ensuring that the application connects to the correct API endpoints, facilitating seamless communication between the frontend and backend components of the overall project architecture.</td>
								</tr>
							</table>
						</blockquote>
					</details>
					<!-- app Submodule -->
					<details>
						<summary><b>app</b></summary>
						<blockquote>
							<div class='directory-path' style='padding: 8px 0; color: #666;'>
								<code><b>⦿ frontend.src.app</b></code>
							<table style='width: 100%; border-collapse: collapse;'>
							<thead>
								<tr style='background-color: #f8f9fa;'>
									<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
									<th style='text-align: left; padding: 8px;'>Summary</th>
								</tr>
							</thead>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/HackTm/blob/master/frontend/src/app/app.component.ts'>app.component.ts</a></b></td>
									<td style='padding: 8px;'>- Defines the main application component for the Angular frontend, serving as the entry point for the user interface<br>- Integrates essential modules such as routing and HTTP services, while incorporating a shared navigation bar for enhanced user experience<br>- This component establishes the foundational structure for the application, facilitating seamless interaction and data management across various parts of the codebase.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/HackTm/blob/master/frontend/src/app/app.component.spec.ts'>app.component.spec.ts</a></b></td>
									<td style='padding: 8px;'>- Unit tests for the AppComponent ensure its proper functionality within the application<br>- By verifying the components creation, title assignment, and rendering of content, these tests contribute to maintaining code quality and reliability<br>- This testing framework supports the overall architecture by enabling developers to confidently implement changes, ensuring that the user interface behaves as expected and enhancing the robustness of the frontend application.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/HackTm/blob/master/frontend/src/app/app.component.html'>app.component.html</a></b></td>
									<td style='padding: 8px;'>- Defines the main layout structure for the application, integrating a navigation bar and a dynamic content area<br>- The navbar facilitates user navigation throughout the app, while the router outlet serves as a placeholder for rendering various components based on the current route<br>- This architecture promotes a modular and organized approach, enhancing user experience and maintainability within the overall codebase.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/HackTm/blob/master/frontend/src/app/app.routes.ts'>app.routes.ts</a></b></td>
									<td style='padding: 8px;'>- Defines the routing configuration for the Angular application, establishing navigation paths between various components such as the home, population map, traffic map, and authentication sections<br>- It ensures a seamless user experience by redirecting users to the appropriate views based on their interactions, while also implementing a fallback route to maintain accessibility<br>- This structure is integral to the overall architecture, facilitating organized and efficient navigation throughout the application.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/HackTm/blob/master/frontend/src/app/app.config.ts'>app.config.ts</a></b></td>
									<td style='padding: 8px;'>- Configures the Angular application by setting up essential providers for change detection, routing, and animations<br>- It establishes a foundational structure that enhances user experience through efficient event handling and smooth transitions<br>- This configuration plays a crucial role in ensuring the application operates seamlessly, aligning with the overall architecture of the project to deliver a responsive and dynamic frontend experience.</td>
								</tr>
							</table>
							<!-- shared Submodule -->
							<details>
								<summary><b>shared</b></summary>
								<blockquote>
									<div class='directory-path' style='padding: 8px 0; color: #666;'>
										<code><b>⦿ frontend.src.app.shared</b></code>
									<!-- footer Submodule -->
									<details>
										<summary><b>footer</b></summary>
										<blockquote>
											<div class='directory-path' style='padding: 8px 0; color: #666;'>
												<code><b>⦿ frontend.src.app.shared.footer</b></code>
											<table style='width: 100%; border-collapse: collapse;'>
											<thead>
												<tr style='background-color: #f8f9fa;'>
													<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
													<th style='text-align: left; padding: 8px;'>Summary</th>
												</tr>
											</thead>
												<tr style='border-bottom: 1px solid #eee;'>
													<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/HackTm/blob/master/frontend/src/app/shared/footer/footer.component.html'>footer.component.html</a></b></td>
													<td style='padding: 8px;'>- Provides a visually appealing footer component for the application, enhancing user experience by displaying branding elements and team credits<br>- Positioned within the shared components of the frontend architecture, it contributes to a cohesive design and reinforces the projects identity, fostering a sense of community and collaboration among users and team members alike.</td>
												</tr>
												<tr style='border-bottom: 1px solid #eee;'>
													<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/HackTm/blob/master/frontend/src/app/shared/footer/footer.component.spec.ts'>footer.component.spec.ts</a></b></td>
													<td style='padding: 8px;'>- Unit testing for the FooterComponent ensures its proper functionality within the application<br>- By setting up a testing environment, it verifies that the component is created successfully and behaves as expected<br>- This contributes to the overall reliability and maintainability of the codebase, fostering confidence in the user interfaces components and enhancing the projects quality assurance practices.</td>
												</tr>
												<tr style='border-bottom: 1px solid #eee;'>
													<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/HackTm/blob/master/frontend/src/app/shared/footer/footer.component.ts'>footer.component.ts</a></b></td>
													<td style='padding: 8px;'>- Facilitates the display of the footer section within the application, enhancing user experience by providing essential information and navigation options at the bottom of the interface<br>- Integrated into the broader Angular architecture, it contributes to the overall layout and design consistency, ensuring that users have access to important links and details across various pages of the application.</td>
												</tr>
											</table>
										</blockquote>
									</details>
									<!-- openlayers-map Submodule -->
									<details>
										<summary><b>openlayers-map</b></summary>
										<blockquote>
											<div class='directory-path' style='padding: 8px 0; color: #666;'>
												<code><b>⦿ frontend.src.app.shared.openlayers-map</b></code>
											<table style='width: 100%; border-collapse: collapse;'>
											<thead>
												<tr style='background-color: #f8f9fa;'>
													<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
													<th style='text-align: left; padding: 8px;'>Summary</th>
												</tr>
											</thead>
												<tr style='border-bottom: 1px solid #eee;'>
													<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/HackTm/blob/master/frontend/src/app/shared/openlayers-map/openlayers-map.component.spec.ts'>openlayers-map.component.spec.ts</a></b></td>
													<td style='padding: 8px;'>- Unit tests validate the functionality of the OpenlayersMapComponent within the Angular application<br>- By ensuring that the component is created successfully, these tests contribute to the overall reliability and maintainability of the codebase<br>- This testing framework supports the projects architecture by promoting confidence in the components integration with the broader mapping features of the application.</td>
												</tr>
												<tr style='border-bottom: 1px solid #eee;'>
													<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/HackTm/blob/master/frontend/src/app/shared/openlayers-map/openlayers-map.component.html'>openlayers-map.component.html</a></b></td>
													<td style='padding: 8px;'>- Facilitating the display of interactive maps within the application, the openlayers-map component serves as a crucial element of the frontend architecture<br>- By providing a dedicated container for map rendering, it enhances user experience through dynamic geographical visualizations, seamlessly integrating with other components to support location-based features and functionalities throughout the project.</td>
												</tr>
												<tr style='border-bottom: 1px solid #eee;'>
													<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/HackTm/blob/master/frontend/src/app/shared/openlayers-map/openlayers-map.component.ts'>openlayers-map.component.ts</a></b></td>
													<td style='padding: 8px;'>- OpenLayersMapComponent facilitates the integration of an interactive map within the application, enabling users to visualize neighborhoods and their associated data<br>- It enhances user experience by allowing navigation to detailed views based on neighborhood selection and displaying complaint markers<br>- The component dynamically centers on the users location, providing a personalized mapping experience while managing various layers for effective data representation.</td>
												</tr>
											</table>
										</blockquote>
									</details>
									<!-- navbar Submodule -->
									<details>
										<summary><b>navbar</b></summary>
										<blockquote>
											<div class='directory-path' style='padding: 8px 0; color: #666;'>
												<code><b>⦿ frontend.src.app.shared.navbar</b></code>
											<table style='width: 100%; border-collapse: collapse;'>
											<thead>
												<tr style='background-color: #f8f9fa;'>
													<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
													<th style='text-align: left; padding: 8px;'>Summary</th>
												</tr>
											</thead>
												<tr style='border-bottom: 1px solid #eee;'>
													<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/HackTm/blob/master/frontend/src/app/shared/navbar/navbar.component.html'>navbar.component.html</a></b></td>
													<td style='padding: 8px;'>- Provides a responsive navigation bar for the application, enhancing user experience by facilitating easy access to key sections such as home, reports, and various maps<br>- It dynamically adjusts options based on user authentication status, ensuring that logged-in users have access to additional features while offering a seamless pathway for authentication for new users<br>- This component plays a crucial role in the overall architecture by promoting intuitive navigation throughout the app.</td>
												</tr>
												<tr style='border-bottom: 1px solid #eee;'>
													<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/HackTm/blob/master/frontend/src/app/shared/navbar/navbar.component.ts'>navbar.component.ts</a></b></td>
													<td style='padding: 8px;'>- NavbarComponent serves as a dynamic navigation bar within the application, providing users with a seamless interface for navigation<br>- It monitors user authentication status and updates the display accordingly, ensuring that logged-in users have access to relevant features<br>- Additionally, it facilitates user logout, enhancing the overall user experience by maintaining a clear and responsive navigation structure throughout the application.</td>
												</tr>
												<tr style='border-bottom: 1px solid #eee;'>
													<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/HackTm/blob/master/frontend/src/app/shared/navbar/navbar.component.spec.ts'>navbar.component.spec.ts</a></b></td>
													<td style='padding: 8px;'>- Testing the NavbarComponent ensures its proper functionality within the application<br>- By setting up a testing environment, it verifies that the component is created successfully and behaves as expected<br>- This contributes to the overall reliability and maintainability of the frontend architecture, allowing for seamless navigation and user experience across the application.</td>
												</tr>
											</table>
										</blockquote>
									</details>
									<!-- creation-dialog Submodule -->
									<details>
										<summary><b>creation-dialog</b></summary>
										<blockquote>
											<div class='directory-path' style='padding: 8px 0; color: #666;'>
												<code><b>⦿ frontend.src.app.shared.creation-dialog</b></code>
											<table style='width: 100%; border-collapse: collapse;'>
											<thead>
												<tr style='background-color: #f8f9fa;'>
													<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
													<th style='text-align: left; padding: 8px;'>Summary</th>
												</tr>
											</thead>
												<tr style='border-bottom: 1px solid #eee;'>
													<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/HackTm/blob/master/frontend/src/app/shared/creation-dialog/creation-dialog.component.spec.ts'>creation-dialog.component.spec.ts</a></b></td>
													<td style='padding: 8px;'>- Unit tests for the CreationDialogComponent ensure its proper functionality within the application<br>- By validating that the component initializes correctly, these tests contribute to the overall reliability and maintainability of the frontend architecture<br>- This component plays a crucial role in facilitating user interactions, enhancing the user experience by providing a dialog for creating new entries in the application.</td>
												</tr>
												<tr style='border-bottom: 1px solid #eee;'>
													<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/HackTm/blob/master/frontend/src/app/shared/creation-dialog/creation-dialog.component.html'>creation-dialog.component.html</a></b></td>
													<td style='padding: 8px;'>- Facilitates the creation and viewing of complaints within the application<br>- In view mode, it displays detailed information about a selected complaint, including its title, status, and description, while allowing users to upvote or downvote<br>- In create mode, it provides a form for users to submit new complaints, ensuring required fields are validated and enabling image uploads<br>- This component enhances user interaction and complaint management in the overall architecture.</td>
												</tr>
												<tr style='border-bottom: 1px solid #eee;'>
													<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/HackTm/blob/master/frontend/src/app/shared/creation-dialog/creation-dialog.component.ts'>creation-dialog.component.ts</a></b></td>
													<td style='padding: 8px;'>- CreationDialogComponent facilitates the user interaction for creating and viewing items within the application<br>- It manages a form that captures essential details, including title, description, category, and image upload<br>- Additionally, it handles geolocation-based voting permissions and dynamically fetches categories and subcategories<br>- The component enhances user experience by providing feedback through notifications and managing the submission process to the backend API.</td>
												</tr>
											</table>
										</blockquote>
									</details>
								</blockquote>
							</details>
							<!-- heatmap3d_v2 Submodule -->
							<details>
								<summary><b>heatmap3d_v2</b></summary>
								<blockquote>
									<div class='directory-path' style='padding: 8px 0; color: #666;'>
										<code><b>⦿ frontend.src.app.heatmap3d_v2</b></code>
									<table style='width: 100%; border-collapse: collapse;'>
									<thead>
										<tr style='background-color: #f8f9fa;'>
											<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
											<th style='text-align: left; padding: 8px;'>Summary</th>
										</tr>
									</thead>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/HackTm/blob/master/frontend/src/app/heatmap3d_v2/heatmap3d.component.spec.ts'>heatmap3d.component.spec.ts</a></b></td>
											<td style='padding: 8px;'>- Unit tests validate the functionality of the MapHeat3DComponent within the heatmap3d_v2 module of the frontend application<br>- By ensuring that the component is created successfully and operates as expected, these tests contribute to the overall reliability and maintainability of the codebase<br>- This enhances the user experience by confirming that the 3D heatmap visualization behaves correctly in various scenarios.</td>
										</tr>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/HackTm/blob/master/frontend/src/app/heatmap3d_v2/heatmap3d.component.ts'>heatmap3d.component.ts</a></b></td>
											<td style='padding: 8px;'>Renders heatmaps in a three-dimensional space, allowing for a more immersive data exploration experience.-<strong>Dynamic Data HandlingIntegrates with backend services to fetch and display real-time neighborhood data.-</strong>User InteractionSupports user interactions, enabling users to click on different areas of the heatmap for detailed information.By encapsulating these functionalities, the <code>heatmap3d.component.ts</code> contributes significantly to the projects goal of providing an interactive and informative mapping solution.</td>
										</tr>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/HackTm/blob/master/frontend/src/app/heatmap3d_v2/heatmap3d.component.html'>heatmap3d.component.html</a></b></td>
											<td style='padding: 8px;'>- Facilitates an interactive heatmap visualization within the application, allowing users to switch between different heatmap categories and light presets<br>- It includes a toolbar for navigation and options to display police coverage, enhancing user experience by providing contextual legends for both ETA and security risk levels<br>- This component plays a crucial role in presenting data-driven insights in a user-friendly manner.</td>
										</tr>
									</table>
								</blockquote>
							</details>
							<!-- map-heat3-d Submodule -->
							<details>
								<summary><b>map-heat3-d</b></summary>
								<blockquote>
									<div class='directory-path' style='padding: 8px 0; color: #666;'>
										<code><b>⦿ frontend.src.app.map-heat3-d</b></code>
									<table style='width: 100%; border-collapse: collapse;'>
									<thead>
										<tr style='background-color: #f8f9fa;'>
											<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
											<th style='text-align: left; padding: 8px;'>Summary</th>
										</tr>
									</thead>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/HackTm/blob/master/frontend/src/app/map-heat3-d/map-heat3-d.spec.ts'>map-heat3-d.spec.ts</a></b></td>
											<td style='padding: 8px;'>- Unit testing for the MapHeat3D component ensures its reliability and functionality within the broader application architecture<br>- By validating the components creation and integration, it contributes to maintaining high-quality standards in the frontend codebase<br>- This testing framework supports ongoing development and enhances the overall user experience by confirming that the heat map visualization behaves as expected in various scenarios.</td>
										</tr>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/HackTm/blob/master/frontend/src/app/map-heat3-d/map-heat3-d.ts'>map-heat3-d.ts</a></b></td>
											<td style='padding: 8px;'>- Users can view and manipulate a 3D heatmap of neighborhoods, making it easier to identify areas of interest.-<strong>Data IntegrationThe component utilizes GeoJSON data to render neighborhood boundaries and associated properties, ensuring accurate representation of the geographical landscape.-</strong>User EngagementIt includes features for user interaction, such as dialogs for data creation and modification, enhancing the overall user experience.## ConclusionIn summary, the <code>map-heat3-d</code> component is a vital element of the projects frontend, facilitating advanced geographical data visualization and user interaction<br>- Its integration with Mapbox GL and GeoJSON data allows for a rich, informative experience that supports users in their exploration of neighborhood dynamics.</td>
										</tr>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/HackTm/blob/master/frontend/src/app/map-heat3-d/map-heat3-d.html'>map-heat3-d.html</a></b></td>
											<td style='padding: 8px;'>- Provides a user interface for an interactive map feature within the application, allowing users to switch between different lighting presets and navigate back to the home screen<br>- It enhances user experience by enabling dynamic visual adjustments based on time-of-day settings, while also offering a quick access button for creating new entries, thereby integrating seamlessly into the overall project architecture focused on user engagement and functionality.</td>
										</tr>
									</table>
								</blockquote>
							</details>
							<!-- density Submodule -->
							<details>
								<summary><b>density</b></summary>
								<blockquote>
									<div class='directory-path' style='padding: 8px 0; color: #666;'>
										<code><b>⦿ frontend.src.app.density</b></code>
									<table style='width: 100%; border-collapse: collapse;'>
									<thead>
										<tr style='background-color: #f8f9fa;'>
											<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
											<th style='text-align: left; padding: 8px;'>Summary</th>
										</tr>
									</thead>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/HackTm/blob/master/frontend/src/app/density/density.component.spec.ts'>density.component.spec.ts</a></b></td>
											<td style='padding: 8px;'>- Unit testing for the DensityComponent ensures its proper functionality within the frontend application<br>- By setting up a testing environment, it verifies that the component initializes correctly and is ready for user interaction<br>- This contributes to the overall reliability and maintainability of the codebase, fostering confidence in the components performance as part of the larger application architecture.</td>
										</tr>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/HackTm/blob/master/frontend/src/app/density/density.component.ts'>density.component.ts</a></b></td>
											<td style='padding: 8px;'>- PopulationMapComponent visualizes population density data on an interactive map using Mapbox<br>- It initializes a map centered on Timisoara, integrates heatmap and point layers to represent population density, and provides tooltips for detailed information on hover<br>- This component enhances user engagement by allowing dynamic exploration of demographic data, contributing to the overall functionality of the application focused on data-driven insights.</td>
										</tr>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/HackTm/blob/master/frontend/src/app/density/density.component.html'>density.component.html</a></b></td>
											<td style='padding: 8px;'>- Renders a map container within the density component of the frontend application, facilitating the display of geographical data visualizations<br>- This component plays a crucial role in the overall architecture by enabling users to interact with and analyze density-related information, thereby enhancing the user experience and providing valuable insights into the data presented.</td>
										</tr>
									</table>
								</blockquote>
							</details>
							<!-- traffic-map Submodule -->
							<details>
								<summary><b>traffic-map</b></summary>
								<blockquote>
									<div class='directory-path' style='padding: 8px 0; color: #666;'>
										<code><b>⦿ frontend.src.app.traffic-map</b></code>
									<table style='width: 100%; border-collapse: collapse;'>
									<thead>
										<tr style='background-color: #f8f9fa;'>
											<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
											<th style='text-align: left; padding: 8px;'>Summary</th>
										</tr>
									</thead>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/HackTm/blob/master/frontend/src/app/traffic-map/traffic-map.component.ts'>traffic-map.component.ts</a></b></td>
											<td style='padding: 8px;'>- TrafficMapComponent enhances the user experience by providing an interactive traffic map that visualizes real-time congestion levels in Timișoara<br>- It integrates with Mapbox to display traffic conditions using color-coded lines, allowing users to quickly assess traffic severity and estimated delays<br>- The component also features popups that offer detailed congestion information upon user interaction, contributing to informed navigation decisions.</td>
										</tr>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/HackTm/blob/master/frontend/src/app/traffic-map/traffic-map.component.spec.ts'>traffic-map.component.spec.ts</a></b></td>
											<td style='padding: 8px;'>- Unit testing for the TrafficMapComponent ensures its reliability and functionality within the application<br>- By setting up a testing environment, it verifies that the component initializes correctly and is ready for user interaction<br>- This contributes to the overall stability of the frontend architecture, promoting confidence in the components performance as part of the broader traffic management system.</td>
										</tr>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/HackTm/blob/master/frontend/src/app/traffic-map/traffic-map.component.html'>traffic-map.component.html</a></b></td>
											<td style='padding: 8px;'>- Low, moderate, heavy, and severe<br>- This enhances user experience by delivering essential information at a glance, contributing to informed travel decisions within the application.</td>
										</tr>
									</table>
								</blockquote>
							</details>
							<!-- components Submodule -->
							<details>
								<summary><b>components</b></summary>
								<blockquote>
									<div class='directory-path' style='padding: 8px 0; color: #666;'>
										<code><b>⦿ frontend.src.app.components</b></code>
									<!-- home Submodule -->
									<details>
										<summary><b>home</b></summary>
										<blockquote>
											<div class='directory-path' style='padding: 8px 0; color: #666;'>
												<code><b>⦿ frontend.src.app.components.home</b></code>
											<table style='width: 100%; border-collapse: collapse;'>
											<thead>
												<tr style='background-color: #f8f9fa;'>
													<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
													<th style='text-align: left; padding: 8px;'>Summary</th>
												</tr>
											</thead>
												<tr style='border-bottom: 1px solid #eee;'>
													<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/HackTm/blob/master/frontend/src/app/components/home/home.component.ts'>home.component.ts</a></b></td>
													<td style='padding: 8px;'>- HomeComponent serves as a central hub for the applications home page, integrating an interactive map and essential UI elements<br>- It fetches data from an external API upon initialization, populating the map with relevant information<br>- By leveraging Angular Material components and a shared footer, it enhances user experience while maintaining a cohesive design within the overall project architecture.</td>
												</tr>
												<tr style='border-bottom: 1px solid #eee;'>
													<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/HackTm/blob/master/frontend/src/app/components/home/home.component.spec.ts'>home.component.spec.ts</a></b></td>
													<td style='padding: 8px;'>- Unit testing for the AuthComponent is established to ensure its proper functionality within the application<br>- By leveraging Angulars testing utilities, the setup verifies that the component initializes correctly and integrates seamlessly with necessary modules, such as FormsModule<br>- This testing framework enhances the overall reliability of the codebase, contributing to a robust user authentication experience in the frontend architecture.</td>
												</tr>
												<tr style='border-bottom: 1px solid #eee;'>
													<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/HackTm/blob/master/frontend/src/app/components/home/home.component.html'>home.component.html</a></b></td>
													<td style='padding: 8px;'>- Showcases a user-friendly interface for the CitySense application, emphasizing community engagement and urban development<br>- It features interactive elements that allow citizens to prioritize issues, visualize data through intelligent maps, and access strategic reports<br>- This component plays a crucial role in facilitating informed decision-making and enhancing the responsiveness of city authorities to community needs.</td>
												</tr>
											</table>
										</blockquote>
									</details>
									<!-- zone-vizuale Submodule -->
									<details>
										<summary><b>zone-vizuale</b></summary>
										<blockquote>
											<div class='directory-path' style='padding: 8px 0; color: #666;'>
												<code><b>⦿ frontend.src.app.components.zone-vizuale</b></code>
											<table style='width: 100%; border-collapse: collapse;'>
											<thead>
												<tr style='background-color: #f8f9fa;'>
													<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
													<th style='text-align: left; padding: 8px;'>Summary</th>
												</tr>
											</thead>
												<tr style='border-bottom: 1px solid #eee;'>
													<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/HackTm/blob/master/frontend/src/app/components/zone-vizuale/zone-vizuale.component.spec.ts'>zone-vizuale.component.spec.ts</a></b></td>
													<td style='padding: 8px;'>- Unit testing for the ZoneVizualeComponent ensures its functionality and reliability within the application<br>- By validating that the component is created successfully, it contributes to the overall stability of the frontend architecture<br>- This testing framework supports the development process by catching potential issues early, thereby enhancing the quality and maintainability of the codebase.</td>
												</tr>
												<tr style='border-bottom: 1px solid #eee;'>
													<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/HackTm/blob/master/frontend/src/app/components/zone-vizuale/zone-vizuale.component.html'>zone-vizuale.component.html</a></b></td>
													<td style='padding: 8px;'>- Facilitates the integration of the MapHeat3DComponent within the zone visualization interface of the application<br>- Positioned within the frontend architecture, it enhances user interaction by rendering a dynamic 3D heat map, contributing to the overall functionality of the zone visualization feature<br>- This component plays a crucial role in visualizing spatial data effectively, enriching the user experience and data interpretation.</td>
												</tr>
												<tr style='border-bottom: 1px solid #eee;'>
													<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/HackTm/blob/master/frontend/src/app/components/zone-vizuale/zone-vizuale.component.ts'>zone-vizuale.component.ts</a></b></td>
													<td style='padding: 8px;'>- Facilitates the integration of the MapHeat3DComponent within the ZoneVizualeComponent, serving as a wrapper that enhances the overall user interface of the application<br>- By encapsulating the heatmap functionality, it streamlines the visualization of data in a 3D format, contributing to a more interactive and informative user experience in the broader context of the projects architecture.</td>
												</tr>
											</table>
										</blockquote>
									</details>
									<!-- sesizari Submodule -->
									<details>
										<summary><b>sesizari</b></summary>
										<blockquote>
											<div class='directory-path' style='padding: 8px 0; color: #666;'>
												<code><b>⦿ frontend.src.app.components.sesizari</b></code>
											<table style='width: 100%; border-collapse: collapse;'>
											<thead>
												<tr style='background-color: #f8f9fa;'>
													<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
													<th style='text-align: left; padding: 8px;'>Summary</th>
												</tr>
											</thead>
												<tr style='border-bottom: 1px solid #eee;'>
													<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/HackTm/blob/master/frontend/src/app/components/sesizari/sesizari.component.html'>sesizari.component.html</a></b></td>
													<td style='padding: 8px;'>- Facilitates the display and management of complaints within the application, tailored for both admin and user roles<br>- It allows admins to download reports, view detailed complaint information, add comments, and resolve issues, while users can see their complaints and interact through upvotes and downvotes<br>- The component enhances user engagement and administrative oversight in the complaint handling process.</td>
												</tr>
												<tr style='border-bottom: 1px solid #eee;'>
													<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/HackTm/blob/master/frontend/src/app/components/sesizari/sesizari.component.ts'>sesizari.component.ts</a></b></td>
													<td style='padding: 8px;'>- Facilitates user interaction with the complaint management system by dynamically retrieving and displaying complaints based on user roles (admin or user)<br>- It enables users to submit comments, update complaint statuses, and download reports, enhancing the overall user experience<br>- This component plays a crucial role in ensuring effective communication and resolution of issues within the application.</td>
												</tr>
												<tr style='border-bottom: 1px solid #eee;'>
													<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/HackTm/blob/master/frontend/src/app/components/sesizari/sesizari.component.spec.ts'>sesizari.component.spec.ts</a></b></td>
													<td style='padding: 8px;'>- Unit testing for the SesizariComponent ensures its reliability and functionality within the application<br>- By setting up a testing environment, it verifies that the component is created successfully and behaves as expected<br>- This contributes to the overall stability of the frontend architecture, allowing for confident integration and future enhancements while maintaining high-quality standards in the codebase.</td>
												</tr>
											</table>
										</blockquote>
									</details>
									<!-- auth Submodule -->
									<details>
										<summary><b>auth</b></summary>
										<blockquote>
											<div class='directory-path' style='padding: 8px 0; color: #666;'>
												<code><b>⦿ frontend.src.app.components.auth</b></code>
											<table style='width: 100%; border-collapse: collapse;'>
											<thead>
												<tr style='background-color: #f8f9fa;'>
													<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
													<th style='text-align: left; padding: 8px;'>Summary</th>
												</tr>
											</thead>
												<tr style='border-bottom: 1px solid #eee;'>
													<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/HackTm/blob/master/frontend/src/app/components/auth/auth.component.html'>auth.component.html</a></b></td>
													<td style='padding: 8px;'>- Facilitates user authentication within the application by providing a structured login interface<br>- It includes fields for user credentials, error handling for login failures, and a submission button to initiate the login process<br>- This component plays a crucial role in the overall user experience, ensuring secure access to the application while maintaining a clean and intuitive design.</td>
												</tr>
												<tr style='border-bottom: 1px solid #eee;'>
													<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/HackTm/blob/master/frontend/src/app/components/auth/auth.component.ts'>auth.component.ts</a></b></td>
													<td style='padding: 8px;'>- Facilitates user authentication within the application by providing a login interface<br>- It captures user input for email, validates it, and simulates a login process by storing user information in local storage<br>- Upon successful login, it redirects users to the home page, enhancing the overall user experience and security of the application by managing user sessions effectively.</td>
												</tr>
												<tr style='border-bottom: 1px solid #eee;'>
													<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/HackTm/blob/master/frontend/src/app/components/auth/auth.component.spec.ts'>auth.component.spec.ts</a></b></td>
													<td style='padding: 8px;'>- Testing framework for the AuthComponent ensures its proper functionality within the application<br>- By setting up a testing environment, it verifies that the component initializes correctly and is ready for user interactions<br>- This contributes to the overall reliability and maintainability of the frontend architecture, fostering confidence in the authentication features of the application.</td>
												</tr>
												<tr style='border-bottom: 1px solid #eee;'>
													<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/HackTm/blob/master/frontend/src/app/components/auth/auth.guard.ts'>auth.guard.ts</a></b></td>
													<td style='padding: 8px;'>- AuthGuard serves as a crucial component in the projects authentication mechanism, ensuring that only authorized users can access specific routes within the application<br>- By checking for the presence of user credentials in local storage, it redirects unauthenticated users to the authentication page, thereby enhancing security and user experience<br>- This functionality is integral to maintaining the integrity of the applications navigation and access control.</td>
												</tr>
											</table>
										</blockquote>
									</details>
								</blockquote>
							</details>
						</blockquote>
					</details>
				</blockquote>
			</details>
		</blockquote>
	</details>
	<!-- backend Submodule -->
	<details>
		<summary><b>backend</b></summary>
		<blockquote>
			<div class='directory-path' style='padding: 8px 0; color: #666;'>
				<code><b>⦿ backend</b></code>
			<table style='width: 100%; border-collapse: collapse;'>
			<thead>
				<tr style='background-color: #f8f9fa;'>
					<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
					<th style='text-align: left; padding: 8px;'>Summary</th>
				</tr>
			</thead>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/HackTm/blob/master/backend/weighted_category.json'>weighted_category.json</a></b></td>
					<td style='padding: 8px;'>- Defines a weighted categorization system for various public services and infrastructure issues, assigning importance scores to each category<br>- This structure facilitates prioritization and decision-making within the broader project, enhancing the ability to address community concerns effectively<br>- By quantifying the significance of each category, it supports resource allocation and strategic planning in urban management initiatives.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/HackTm/blob/master/backend/weighted_cartiere.json'>weighted_cartiere.json</a></b></td>
					<td style='padding: 8px;'>- Weighted cartiere data provides a structured representation of various neighborhoods, each assigned a specific weight reflecting their significance or desirability<br>- This information is integral to the backend architecture, enabling the application to make informed decisions regarding neighborhood selection, user recommendations, or resource allocation, ultimately enhancing user experience and engagement within the project.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/HackTm/blob/master/backend/helper_routes.py'>helper_routes.py</a></b></td>
					<td style='padding: 8px;'>- Facilitates the retrieval of categories and subcategories from a JSON data source within the backend architecture<br>- By providing dedicated endpoints, it enables users to access a structured list of categories and their corresponding subcategories, enhancing the overall functionality of the application<br>- This integration supports dynamic content management and improves user experience by allowing seamless access to categorized information.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/HackTm/blob/master/backend/app.py'>app.py</a></b></td>
					<td style='padding: 8px;'>- Establishes a robust backend framework for a Flask-based API, integrating Firebase for data management and enabling CORS for frontend communication<br>- It initializes essential services, including Firestore, and organizes various route namespaces for efficient API handling<br>- This architecture supports a seamless interaction between the client and server, facilitating data retrieval and manipulation through a structured RESTful interface.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/HackTm/blob/master/backend/sesizari_routes.py'>sesizari_routes.py</a></b></td>
					<td style='padding: 8px;'>- Facilitates the management of user-reported issues within the sesizari project by providing RESTful API endpoints for retrieving and creating reports<br>- It allows users to submit detailed information about issues, including location and categorization, while ensuring data integrity through validation<br>- The integration with Firestore enables efficient storage and retrieval of reports, enhancing community engagement and responsiveness to local concerns.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/HackTm/blob/master/backend/firebase_client.py'>firebase_client.py</a></b></td>
					<td style='padding: 8px;'>- Establishes a connection to Firebase by loading credentials from environment variables and initializing the Firebase app if it hasnt been done already<br>- This setup enables seamless interaction with Firestore, allowing the broader application to perform database operations efficiently<br>- It plays a crucial role in the backend architecture by facilitating data storage and retrieval, essential for the overall functionality of the project.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/HackTm/blob/master/backend/weighted_subcategories.json'>weighted_subcategories.json</a></b></td>
					<td style='padding: 8px;'>- Defines a weighted categorization of various urban issues and environmental concerns, assigning severity scores to each category<br>- This structured data serves as a foundational component for the backend of the project, enabling effective prioritization and management of reported incidents<br>- By quantifying the impact of different issues, it aids in resource allocation and enhances the overall responsiveness of the system to community needs.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/HackTm/blob/master/backend/sesizari_by_id.py'>sesizari_by_id.py</a></b></td>
					<td style='padding: 8px;'>- Provides a RESTful API for managing sesizari (reports) within a backend architecture<br>- It enables retrieval of reports by user ID or document ID and allows updating the status of a report to solutionat<br>- This functionality facilitates efficient interaction with a Firestore database, ensuring that users can access and modify report data seamlessly, thereby enhancing the overall user experience in the application.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/HackTm/blob/master/backend/cartiere.json'>cartiere.json</a></b></td>
					<td style='padding: 8px;'>- Project Summary## OverviewThe <code>cartiere.json</code> file serves as a crucial component of the backend architecture for this project, providing geographic data in the form of MultiPolygon geometries<br>- This data is essential for representing specific geographical areas, in this case, the region associated with the name Iosefin<br>- ## PurposeThe primary purpose of this file is to store and structure geographic information that can be utilized by various parts of the application, such as mapping features, spatial analysis, or location-based services<br>- By defining the coordinates of the MultiPolygon, the project can accurately visualize and manipulate geographic boundaries, enhancing user experience and functionality.## IntegrationAs part of the overall codebase, <code>cartiere.json</code> integrates seamlessly with other backend services, allowing for efficient data retrieval and processing<br>- This integration supports the applications ability to deliver location-specific features, making it a vital asset in achieving the project's goals.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/HackTm/blob/master/backend/sesizari_by_filter.py'>sesizari_by_filter.py</a></b></td>
					<td style='padding: 8px;'>- Provides a set of API endpoints for retrieving sesizari (complaints) based on specific filters such as active status, category, and neighborhood<br>- It facilitates efficient data access from a Firestore database, enabling users to query and sort complaints effectively<br>- This functionality enhances the overall architecture by integrating backend services with a structured approach to data retrieval and management.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/HackTm/blob/master/backend/helpers.py'>helpers.py</a></b></td>
					<td style='padding: 8px;'>- Provides functionality for neighborhood analysis and scoring based on user-generated reports<br>- It determines which neighborhood a specific geographic point belongs to and aggregates data from a Firestore database to compute scores related to issues, security, and investment opportunities within neighborhoods<br>- This analysis aids in visualizing community concerns and prioritizing areas for improvement based on user feedback and engagement.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/HackTm/blob/master/backend/heatmap_routes.py'>heatmap_routes.py</a></b></td>
					<td style='padding: 8px;'>- Facilitates the retrieval of heatmap-related data within the backend architecture<br>- It provides endpoints to access various metrics, including problems, security scores, and investment scores, leveraging a Firestore client for data management<br>- This functionality supports the overall project by enabling users to gain insights into critical areas, enhancing decision-making and strategic planning based on the heatmap analysis.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/HackTm/blob/master/backend/sesizari_post.py'>sesizari_post.py</a></b></td>
					<td style='padding: 8px;'>- Facilitates user interaction with the sesizari system by enabling upvoting, downvoting, and commenting on specific sesizari entries<br>- It manages user votes and comments while ensuring data integrity through checks against existing votes and comments<br>- This functionality enhances user engagement and feedback within the application, contributing to a dynamic and responsive platform for managing sesizari.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/HackTm/blob/master/backend/reportroutes.py'>reportroutes.py</a></b></td>
					<td style='padding: 8px;'>- Facilitates the generation and download of PDF reports through a dedicated API endpoint<br>- By leveraging Flask and enabling CORS, it ensures seamless access for clients across different origins<br>- The integration with a PDF generation utility allows users to retrieve reports in a standardized format, enhancing the overall functionality of the backend architecture within the project.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/HackTm/blob/master/backend/pdf.py'>pdf.py</a></b></td>
					<td style='padding: 8px;'>- Generates a comprehensive PDF report summarizing community reports, security scores, and investment priorities by neighborhood<br>- It aggregates data from a Firebase database, presenting key metrics such as total reports, active versus resolved cases, and detailed tables for reported issues, security ratings, and investment scores<br>- This functionality enhances data visibility and supports informed decision-making within the projects broader architecture.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/HackTm/blob/master/backend/subcategorii.json'>subcategorii.json</a></b></td>
					<td style='padding: 8px;'>- Categorization of various public issues and concerns is achieved through a structured JSON format, facilitating efficient reporting and management<br>- It encompasses diverse topics such as animal welfare, public safety, environmental conditions, and urban infrastructure<br>- This organization supports users in identifying and addressing specific community problems, enhancing the overall functionality of the project’s reporting platform.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/HackTm/blob/master/backend/requirements.txt'>requirements.txt</a></b></td>
					<td style='padding: 8px;'>- Defines essential dependencies for the backend of the project, enabling a robust web application framework with Flask<br>- Facilitates RESTful API development through Flask-RESTx, supports environment variable management with python-dotenv, and integrates Firebase for backend services<br>- Additionally, enhances data handling and reporting capabilities with libraries like Shapely and ReportLab, ensuring a comprehensive architecture for efficient application functionality.</td>
				</tr>
			</table>
		</blockquote>
	</details>
</details>

---

## 🚀 Getting Started

### 📋 Prerequisites

This project requires the following dependencies:

- **Programming Language:** TypeScript
- **Package Manager:** Npm, Pip

### ⚙️ Installation

Build HackTm from the source and intsall dependencies:

1. **Clone the repository:**

    ```sh
    ❯ git clone https://github.com/Emanuel181/HackTm
    ```

2. **Navigate to the project directory:**

    ```sh
    ❯ cd HackTm
    ```

3. **Install the dependencies:**

**Using [npm](https://www.npmjs.com/):**

```sh
❯ npm install
```
**Using [pip](https://pypi.org/project/pip/):**

```sh
❯ pip install -r backend/requirements.txt
```

### 💻 Usage

Run the project with:

**Using [npm](https://www.npmjs.com/):**

```sh
npm start
```
**Using [pip](https://pypi.org/project/pip/):**

```sh
python {entrypoint}
```

### 🧪 Testing

Hacktm uses the {__test_framework__} test framework. Run the test suite with:

**Using [npm](https://www.npmjs.com/):**

```sh
npm test
```
**Using [pip](https://pypi.org/project/pip/):**

```sh
pytest
```

---

## 📈 Roadmap

- [X] **`Task 1`**: <strike>Implement feature one.</strike>
- [ ] **`Task 2`**: Implement feature two.
- [ ] **`Task 3`**: Implement feature three.

---

## 🤝 Contributing

- **💬 [Join the Discussions](https://github.com/Emanuel181/HackTm/discussions)**: Share your insights, provide feedback, or ask questions.
- **🐛 [Report Issues](https://github.com/Emanuel181/HackTm/issues)**: Submit bugs found or log feature requests for the `HackTm` project.
- **💡 [Submit Pull Requests](https://github.com/Emanuel181/HackTm/blob/main/CONTRIBUTING.md)**: Review open PRs, and submit your own PRs.

<details closed>
<summary>Contributing Guidelines</summary>

1. **Fork the Repository**: Start by forking the project repository to your github account.
2. **Clone Locally**: Clone the forked repository to your local machine using a git client.
   ```sh
   git clone https://github.com/Emanuel181/HackTm
   ```
3. **Create a New Branch**: Always work on a new branch, giving it a descriptive name.
   ```sh
   git checkout -b new-feature-x
   ```
4. **Make Your Changes**: Develop and test your changes locally.
5. **Commit Your Changes**: Commit with a clear message describing your updates.
   ```sh
   git commit -m 'Implemented new feature x.'
   ```
6. **Push to github**: Push the changes to your forked repository.
   ```sh
   git push origin new-feature-x
   ```
7. **Submit a Pull Request**: Create a PR against the original project repository. Clearly describe the changes and their motivations.
8. **Review**: Once your PR is reviewed and approved, it will be merged into the main branch. Congratulations on your contribution!
</details>

<details closed>
<summary>Contributor Graph</summary>
<br>
<p align="left">
   <a href="https://github.com{/Emanuel181/HackTm/}graphs/contributors">
      <img src="https://contrib.rocks/image?repo=Emanuel181/HackTm">
   </a>
</p>
</details>

---

## 📜 License

Hacktm is protected under the [LICENSE](https://choosealicense.com/licenses) License. For more details, refer to the [LICENSE](https://choosealicense.com/licenses/) file.

---

## ✨ Acknowledgments

- Credit `contributors`, `inspiration`, `references`, etc.

<div align="left"><a href="#top">⬆ Return</a></div>

---
