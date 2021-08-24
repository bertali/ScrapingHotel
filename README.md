Scraping hotel website with puppeteer
============

***

## Project context

This project is thought as a way of apply the "scraping" method through javascript functions with the use of node.js and its library puppeteer.

With the method "scraping" and puppeteer we can grab information from a website in a more automated way in order. Thus, we can use javascript functions to analyze this information and get results.


## Install the project

1. Clone the git repository https://github.com/bertali/ScrapingHotel.git
2. Install or update node.js
3. Install puppeteer


## Start the project

The functions to grab the information from the hotel website and the functions to analyze the data ara in the document hotel.js, inside the scripts folder. 
The function to open the browser and a new page to navigate through the url website is in the document index.js which require the scripts.
Thus, to make the project start working write "node index" inside the terminal. 


## Results

All the resulting data selected will appear insde a json document named hotel.json.

<img width="453" alt="Captura de pantalla 2021-08-24 a las 10 21 04" src="https://user-images.githubusercontent.com/82206421/130582803-e0ed5f2e-2136-4133-841c-f98f64737710.png">


## Tests

Two tests are passing with the command "npm test". Those tests are in the tests folder under the name of bookingdata.test.js and are related to tests two general functions created in utils.js, inside the scripts folder.

<img width="930" alt="test failed" src="https://user-images.githubusercontent.com/82206421/130581331-5cdad103-314b-4f0a-8544-d306920d3e3e.png">


<img width="917" alt="test passed" src="https://user-images.githubusercontent.com/82206421/130581349-4f897ff5-baa0-45e3-a49a-816bad846dcf.png">


*Note: in the future it would be a good practice to refactor the code and try to run more tests. 




