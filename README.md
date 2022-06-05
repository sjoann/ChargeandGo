<div id="top"></div>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/sjoann/ChargeandGo">
    <img src="assets/logo white.png" alt="Logo" width="160" height="160">
  </a>

<h3 align="center">Charge & Go</h3>

  <p align="center">
  A mobile application aimed to improve the experience of charging an Electric Vehicle.
    <br />
    Created by Joan & Caden for NUS Orbital (Apollo 11).
    <br />
    <a href="https://github.com/sjoann/ChargeandGo"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://www.youtube.com/watch?v=OiTX5_LfhzA">Watch our Video</a>
    ·
    <a href="https://nusskylab-dev.comp.nus.edu.sg/posters/2022/5062.jpg">View our Poster</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

<h3>Motivation</h3> 

When you’re left with 5% of charge in your electric vehicle, or just want a general direction to the nearest car charger in Singapore, your current alternatives are searching through a list of applications (Greenlots, QuickCharge, SP Mobility, BlueSG etc) to find the closest charger.
</br>
</br>
Not only does this take time, but it will deplete the car battery even more. At last, you found and drove to a car charger, but only to realize that it is faulty. You desperately need the charger, but the closest charger is beyond the range of your car’s remaining battery. Unlike Internal Combustion Engine (ICE) vehicles where drivers can choose to top up with a small jerry can of fuel, you do not have that luxury with an electric vehicle. Nothing can be done at this point other than to call a tow truck which is time consuming and expensive.

<h3>Aim</h3>
As the government plans to phase out ICE vehicles by 2040, we hope to improve the convenience and experience of electric vehicle owners (in terms of charging an electric vehicle) in Singapore. 
</br>
</br>
Also, according to Transport Minister Ong Ye Kung, the government aims to deploy 60,000 electric vehicle (EV) charging points across the country by 2030, with some 40,000 in public car parks and 20,000 in private premises. Registration of diesel cars and taxis will also cease from 2025. 
</br>
</br>
This means that there will be a larger population of users using electric vehicles in the future. Using the increase in EV owners to our advantage, we are able to pool together feedback from the community about the chargers installed, such as its serviceability and ratings. With the contribution from the community, we are able to provide live updates and recommendations to other users who are looking for a charger. Hence, this app will greatly bring benefits and a better charging experience to the community.
<h3>User Stories</h3>
  <ol>
    <li>As a driver, I want to use a mobile app that have features that make my car ride more convenient</li>
    <li>As a driver, i want to know the real-time traffic news in order to plan my route more carefully eg. knowing that certain roads are under construction/road works, I can avoid them when traveling</li>
    <li>As a driver, I want to be able to find the nearest available charging station when my car’s battery is running low, making my traveling journey more convenient and fuss-free</li>
    <li>As a driver, I want to find out which chargers are faulty, avoiding a wasted trip</li>
    <li>As a driver, I want to find out the closest amenities such as washrooms and restaurants while waiting for my car to be charged</li>
    <li>As a driver, I want an application that is easy to navigate around</li>
  </ol>
<h3>Features</h3>
<h4>Login & Registration</h4>
[Proposed]
</br>
Upon opening our application, users can choose to log in or register
</br>
</br>
To create an account, users have to enter the following details:
  <ol>
    <li>Name</li>
    <li>Email</li>
    <li>Profile Picture</li>
    <li>Password</li>
  </ol>
 Users are able to switch between the login page and registration page easily.

[Current Progress]
</br>
Currently, we require users to register with
  <ol>
    <li>Name</li>
    <li>Email</li>
    <li>Password</li>
  </ol>
However, more work needs to be done to implement the profile picture feature.
Furthermore, we should require users to confirm their password again to prevent them from mistyping their password.
</br>
</br>
Users can also reset their password by keying in their email
</br>
</br>
If the account is not found, the user will receive an alert
</br>
</br>
If the account exists, users will have to reset their password using the link sent to their email account
</br>
</br>
[Possible additional features]
</br>
To save user’s time, we could implement Google and FaceBook authentication for easy one click registration and log in.
</br>
</br>
Upon registration/logging in, users will be brought over to the home page.

<h4>Home Page</h4>
[Proposed]
</br>
Find out where the road works are carried out around Singapore.
</br>
Check real-time footage of traffic conditions on the roads.
</br>
Check live traffic conditions and updates on road closures and road works.
</br>
</br>
[Current Progress]
</br>
Using LTA’s DataMall API, we are able to fetch the latest road incidents. We have decided to push the 10 latest ones to the user using a scroll table (see Figure 7). This provides easy access to traffic news for drivers.
</br>
</br>
More work needs to be done in improving the user interface, such as decluttering the table.

<h4>Map</h4>
[Proposed]
</br>
Google Map displaying the locations of the electric car charging stations via red markers.
</br>
</br>
Filter system:
  <ol>
    <li>Availability of charger</li>
    <li>Type of charging cables</li>
    <li>Chargers within a specified radius</li>
  </ol>
 Sort system:
   <ol>
    <li>Cost of charging</li>
    <li>Cost of parking</li>
    <li>Distance away from current location</li>
  </ol>
  Search system:
  <ol>
    <li>Search for specified location</li>
  </ol>
  Users are also able to submit new charging locations by dragging a pin on the map, which will be pushed to our Firebase.
  </br>
  </br>
  [Current Progress]
  </br>
  We implemented Google Maps with markers and listed down charging stations with the details of the chargers (see Figure 8). The location of the user will also appear on the map.
</br>
</br>
When the user clicks on a specific charger, a callout will be displayed above the charger, showing the name and the description that was submitted by previous users.
<h4>Forum</h4>
[Proposed]
</br>
Forum displaying questions and answers of the users
   <ol>
    <li>Other Q&A such as nearby amenities (washroom, restaurants, etc)</li>
    <li>Find out current occupancy of charging station</li>
    <li>Report faulty charging station</li>
  </ol>

[Current Progress]
</br>
Currently, users can submit a post.
</br>
A post consists of
   <ol>
    <li>Post title</li>
    <li>Post text</li>
    <li>Post date and time</li>
  </ol>





<p align="right">(<a href="#top">back to top</a>)</p>



### Built With

* [React.js](https://reactjs.org/)
* [Firebase](https://firebase.google.com/)
* [Google Maps API](https://developers.google.com/maps)
* [LTA Datamall API](https://datamall.lta.gov.sg/content/datamall/en.html)
* [Javascript](https://www.javascript.com/)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

To run our application, please follow the steps below.

### Prerequisites

Node and npm are required to be installed before use. You can install Node [here](https://nodejs.org/en/download/)

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/sjoann/ChargeandGo
   cd ChargeandGo
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Run Expo CLI
   ```js
   expo start
   ```
You can start the application on Android Studio/XCode directly, or scan the QR code using your mobile phone with Expo Go installed.

<p align="right">(<a href="#top">back to top</a>)</p>



