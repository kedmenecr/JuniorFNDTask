## Assignment
The assignment is to create a web personalization. The web personalization will be a popup which will have two views.
One view will display a list of GitHub accounts, while the other will display details for a specific account. 
The first screen ("list view") will display contain a list of account id's and names for each account from the list. Clicking on a list item switches to the detail screen. A loading animation is displayed while the account details are being fetched.
The second screen ("detail view") will display details for a selected account. This screen displays the name, company, public_repos, public_gists fields from the selected user.
The business has decided that the website user can see each GitHub account only once. All account detail views have to be tracked, and then those accounts must be filtered out from the first screen ("list view").

### Delivery
Implement your solution in the files given below.	
-	css/task.css
-	js/task.js

## Design
### Styles
Style specification is given poorly on purpose. You can freely apply custom design or slice the provided images. 
You can reuse existing css classes.

#### Header   
-    background-color: #24292e    

#### Views  
-	max-height: 700px    
-	max-width: 300px;   
-	window position: bottom right (9)

1  2  3   
4  5  6   
7  8 [9]    

### Content
#### List view

1.	Header:	
	text: Github Users	
2.	List: collection of fetched accounts    
	onRowClick - switches to details view    
3. Dismiss button - ×   
	onClick - hides the popup   

#### Details View
1. Header: - displays login field (ex. mojombo)
2. Image - displays avatar_url field
3. Company - displays company field
4. Stats(public_repos, public_gists)
5. Dismiss button - ×    
	onClick - hides the popup

##    Github Account Data Fetching
Github accounts can be fetched through the GitHub API.    
Documentation can be found [here](https://developer.github.com/v3/users/).    
Required endpoints:   
1. [Fetch all users](https://developer.github.com/v3/users/#get-all-users)   
2. [Fetch a single user](https://developer.github.com/v3/users/#get-a-single-user)    

###    Limitations
You can use either plain javascript or ajax for data fetching.

##    Storage
You can use any browser method for storing data.

##    Global Limitations
Usage of any additional libraries is forbidden.