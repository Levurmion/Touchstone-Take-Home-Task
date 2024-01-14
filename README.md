# About
This is a take-home assignment that was part of the Touchstone Advisory Software Engineering application process. The goal of this exercise is to build a frontend application that tracks the status of London's tube lines by interfacing with the [TfL Unified API](https://api.tfl.gov.uk/swagger/ui/index.html#!/Line/Line_MetaModes). Specifically, the functional requirements for this app are as follows:
- The app should display a table, providing a high-level overview of the status of all tube lines.
- When a given line is clicked, the user should be presented with more detailed information about the line clicked.
- The user should be able to filter the table of displayed lines.

# Running the App

## Option 1
Clone the repository and install dependencies:
```
npm install
```
build the app,
```
npm run build
```
and start the NextJS server.
```
npm run start
```

## Option 2
Run the publicly available `linux/arm64` Docker image:
```
docker run -d -p 3000:3000 levurmion/tfl_monitoring_app:final
```

You can then access the application locally through `http://localhost:3000` in your web browser.
