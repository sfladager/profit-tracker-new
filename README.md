# Profit Tracker

  Profit Tracker was my 4th and final project in the General Assembly Software Engineer Immersive course. I have been trading equities and cryptocurrencies for several years, and have been wanting to create my own trading journal and tracking app. I took this opportunity to create that web app. We had 8 days to incorporate everything we had learned in the past 3 months to develop a full stack web app. The main tech stack used was React JS, and Django REST framework to serve data from a PostgreSQL database.
  
  The project presented many challenges as we had just learned Django, and only spent 2 days learning python. As a result of the project, I gained a much better understanding of the Django REST framework, and React JS. By the end of the project I was able to incorporate the following: a login/register/profile page, a dashboard with a graph displaying the accumulated account value over time with some account statistics, a trade list page displaying some key trade statistics with the ability to filter by symbol and setup, a single trade page with key trade statistics, and the ability to add as many executions as needed with each trade and execution having CRUD functionality, and a separate session section that pulls in trade statistics relevant to that trading session and the session journal also has CRUD. I also started with a mobile first design approach to ensure the web app was fully responsive to work on any size screen. Below are 2 gifs going through some of the features the web app has.
  
![walkthrough-1](https://media.giphy.com/media/VpuPEeUe5PwYNkGZ2U/giphy.gif)
![walkthrough-2](https://media.giphy.com/media/0YmcAXXjKf1f2u8Jmn/giphy.gif)
  
# Link
Check out the website here → ![https://profit-tracker.herokuapp.com/]

# Brief
- Build a full-stack application by making your own backend and your own front-end.
- Use a Python Django API using Django REST framework to serve your data from a Postgres database.
- Consume your API with a separate front-end built with React
- Be a complete product which most likely means multiple relationships and CRUD functionality for at least a couple of models.
- Implement thoughtful use stories/wireframes that are significant enough to help you know which features are core MVP and which you can cut.
- Have a visually impressive design to kick your portfolio up a notch and have something to wow future clients & employers.
- Be deployed online so it's publicly accessible.

# Technologies Used
- React.js
- JavaScript
- Python
- Django
- Django REST framework
- PostgreSQL
- SASS
- Axios
- Git
- GitHub
- Insomnia
- npm
- JWT
- Bootstrap
- HTML5
- Cloudinary
- DropZone
- Heroku
- DraftJS
- html-react-parser
- Recharts
- TradingView Chart widget
- TablePlus
- Figma

# Installation
- Clone or download the repo
- In root folder run: ``` npm install ```
- Run ``` mongod --dbpath ~/data/db ``` if you are using MacOS Catalina. Otherwise run mongod
- ``` npm run seed ``` to seed the database
- ``` npm run serve ``` to run the server
- In the terminal of the root folder enter the following command to start the server: 
``` python3 manage.py runserver ```
- Cd into client folder and type: ``` npm start  ```to get front end started

# Approach taken
- Day 1: Ideas research, Figma design, models and relationship design
- Day 2 - 3: Backend setup creating CRUD functionality for all models and establishing relationships
- Day 4 - 5: Setup basic layout of all pages and website with basic functionality and connecting to API
- Day 6 - 7: Add in details to each page per the plan
- Day 8: Fix bugs, and improve styling and test features are working
- Day 9: Project presentations 9:30am, Deployment with Heroku

# Planning 
  I started by researching existing trading journal apps to see what worked well and what didn’t and where I might be able to make improvements. Coming up with the general design, UI/UX, and backend models was challenging. My personal experience was useful to help determine what would provide a good user experience and make journaling easier, as well as analyzing trades. 
  After flipping through many ideas the results of the wireframe and models are displayed below. I did change the color scheme and some design, but followed the figma design and model design closely. One thing I found challenging to plan was where and how I would do the statistics calculations as we had not done anything like this. My goal was to put most of the calculations on the backend, which worked out well once I learned where to put them. 
  
  ![wireframe-1](/screenshots/wireframe-1.png)
  ![wireframe-2](/screenshots/wireframe-2.png)
  
# Build
  I began the project by developing the backend in full. I followed my models outlined above to get me started, and tested backend functionality with Insomnia. There were a few times where I had to stop and think about how the user would interact with their trades and account. I frequently took a step back and had to think about the user experience to make decisions of how I would proceed. This slowed me down a lot in the beginning, but it was worth the time. I used competition and my own experience to come up with a good user experience, and figma and the models to keep me focused on my plans.

## Back End
  The back end of the project was built using the Django REST framework and Python and the data was served with a PostgreSQL database. The backend that I designed required the following models: user, trade, execution, and session. The user model allowed a user to create an account and login. A trade model was needed for a user to add trades, which then provided the ability for a user to add executions which are tied to that newly created trade. After a user enters a trade, they can add a session for the day, which is related to the trades created that day. 
  
  I started creating the user model so I could create a custom user model instead of using the default Django user model. I kept the user model simple for this project, and the code below shows the model I used. 
  
```

class User(AbstractUser):
  email = models.CharField(max_length=50, unique=True)
  first_name = models.CharField(max_length=50, default=None, blank=True, null=True)
  last_name = models.CharField(max_length=50, default=None, blank=True, null=True)
  profile_image = models.CharField(max_length=500, default='https://res.cloudinary.com/dubrvgdmq/image/upload/v1670691830/SPROUT_ANYWHERE_BLOG/bc9klaeyfkghon15vwdy.png')
  
```

  An authentication file was also needed to check that the password is valid and matches the hash value stored by the user for the user to be able to login and use any CRUD functionality on the web app. The code used for this is displayed below. 

```

class JWTAuthentication(BaseAuthentication):
  def authenticate(self, request):
    #print('REQEST HEADERS ->', request.headers)

    # 1. Check if headers exist
    if not request.headers:
      return None
    # 2. Authorization Header exists
    headers = request.headers.get('Authorization')
    if not headers:
      return None
    # 3. Check that it's a Bearer token
    if not headers.startswith('Bearer '):
      raise PermissionDenied('Invalid Token')
    # 4. Remove Bearer & space from Authorization header, and save token to variable
    token = headers.replace('Bearer ', '')
    # print('TOKEN ->', token)

    try:
      # 5. Use JWT method to verify token is valid and extract payload information
      payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
      # 6. Use the sub portion of the token to query the User table to find a match
      user = User.objects.get(pk=payload['sub'])
      # print('USER ->', user.id)
    except User.DoesNotExist:
      raise PermissionDenied('User Not Found')
    except Exception as e:
      print(e)
      raise PermissionDenied(str(e))
    
    # 7. Return tuple container user and the token
    return (user, token)
    
  ```

Three different serializers were needed to get the desired user functionality.
- A common user serializer used to register a user which checks if the password is valid, removes the password entry and password confirmation entry from the JSON file, and finally hashes the password to be stored in the database
- A populated user serializer which adds the calculated trade information to the user’s id, and runs calculations to provide account statistics used on the dashboard
- A profile user serializer was created to add the ability for the user to update basic info without requiring their password

The function created to calculate that account statistics in the PopulatedUserSerializer was invoked anytime a user loaded the dashboard page, and the view for the get request is shown below.

```

#Endpoint /auth/profile/
class ProfileView(APIView):
  permission_classes = (IsAuthenticated, )
  # GET all trade data that the user owns
  def get(self, request):
    # print("REQUEST USER ->", request.user)
    profile_to_get = User.objects.get(pk=request.user.id)
    serialized_profile = PopulatedUserSerializer(profile_to_get)
    trades_with_stats = serialized_profile.set_account_stats()
    return Response (trades_with_stats)

```

  The next two things I worked on were the Trades and Executions section of the backend. I’ll point out a few things in each section that I had learned about while working on them. 
  
  It’s important that only the user who created the trade, is the only person who can view those trades. We always used the method Model.objects.all() to get a list of all trades, but in this instance, that method called ALL trades in the database from all users. The filter method was useful here as I was able to select trades based on user id and only return those trades. The view used is shown below. 

```

# Endpoint: /trades/
class TradeListView(APIView):
  permission_classes = (IsAuthenticated, )
  # GET all trades controller
  # Description: returns all trades found back to user
  def get(self, request):
    trades = Trade.objects.filter(owner_of_trade=request.user.id)
    serialized_trades = TradeSerializer(trades, many=True)
    return Response(serialized_trades.data)
    
```

  The model for the trade has a lot of options, and has a few dropdown menus using the choices options, which have over 30 choices in total. This was my first time testing out the choices options, and I found it very useful. The picture below shows part of the trade model with some of the choices implemented into the model.

```

TYPE_OF_ASSET = (
  (None, 'Select Asset'),
  ('stocks', 'Stocks'),
  ('crypto', 'Crypto'),
  ('forex', 'Forex'),
  ('futures', 'Futures'),
  ('options', 'Options'),
  ('bonds', 'Bonds'),
)
TYPE_OF_TRADE = (
  (None, 'Select Type'),
  ('DT', 'Day Trade'),
  ('ST', 'Swing'),
  ('LT', 'Long Term'),
  )
POSITION_TYPE = (
  (None, 'Select Type'),
  ('long', 'Long'),
  ('short', 'Short'),
)
TIMEFRAME_OPTIONS = (
    (None, 'Select Timeframe'),
    ('1', '1 min'),
    ('2', '2 min'),
    ('3', '3 min'),
    ('5', '5 min'),
    ('10', '10 min'),
    ('15', '15 min'),
    ('30', '30 min'),
    ('60', '60 min'),
    ('240', '4 hour'),
    ('D', 'Daily'),
    ('W', 'Weekly'),
  )

class Trade(models.Model):
  date_opened = models.DateField()
  date_closed = models.DateField(blank=True, default=None, null=True)  
  asset_class = models.CharField(max_length=7, choices=TYPE_OF_ASSET, default=None)
  trade_type = models.CharField(max_length=2, choices=TYPE_OF_TRADE, default=None)
  side = models.CharField(max_length=5, choices=POSITION_TYPE, default=None)
  symbol = models.CharField(max_length=15)
  timeframe = models.CharField(max_length=10, choices=TIMEFRAME_OPTIONS, default=None)
  target = models.FloatField(blank=True, default=None, null=True)
  stoploss = models.FloatField(blank=True, default=None, null=True)
  expected_r = models.FloatField(blank=True, default=None, null=True)
  setup = models.CharField(max_length=100)
  mistakes = models.CharField(max_length=200, blank=True, default=None, null=True)
  notes = models.TextField()
  avg_buy_price = models.FloatField(blank=True, default=None, null=True)
  avg_sell_price = models.FloatField(blank=True, default=None, null=True)
  total_cost = models.FloatField(blank=True, default=None, null=True)
  gross_return = models.FloatField(blank=True, default=None, null=True)
  net_return = models.FloatField(blank=True, default=None, null=True)
  total_commission = models.FloatField(blank=True, default=None, null=True)
  percent_return = models.FloatField(blank=True, default=None, null=True)
  net_R = models.FloatField(blank=True, default=None, null=True)
  owner_of_trade = models.ForeignKey(
    'jwt_auth.User',
    related_name='trades',
    blank=True,
    default=None,
    null=True,
    on_delete=models.PROTECT
  )
    
```

  All of the choices in the Trade model made building the form challenging as there was no way to dynamically populated the dropdown selectors, so I would have had to hardcode every option! I didn’t like this idea much, so I looked for a way to target the dropdown fields, which turned out to be a lot trickier than I anticipated. The code block below shows how I used the meta fields on the Trade model to access the choices on a field, and loop through them if the choices existed.

```

# Endpoint: /trades/form
class TradeFormView(APIView):
  permission_classes = (IsAuthenticated, )
  def get(self, _request):
    fields = Trade._meta.fields
    fields_with_choices = [{'name': field.name, 'choices': field.choices} for field in fields if field.choices]
    # print(fields_with_choices)
    return Response(fields_with_choices)

```

  The model for the executions was much shorter and I am showing the model below to display how I created a one to many relationship with a Trade and a User by using the foreign key option. The User model has a one to many relationship with all models, but each trade, execution, and session, can only be attached to one user. 

```

class Execution(models.Model):
  BUY_OR_SELL = (
        (None, 'Select Action'),
        ('buy', 'buy'),
        ('sell', 'sell'),
    )
  action = models.CharField(max_length=4, choices=BUY_OR_SELL, default=None)
  date = models.DateField()
  time = models.TimeField()
  quantity = models.PositiveIntegerField()
  price = models.FloatField()
  commissions = models.FloatField(default=0)
  trade = models.ForeignKey(
    'trades.Trade',
    related_name='executions',
    on_delete=models.CASCADE
  )
  owner = models.ForeignKey(
    'jwt_auth.User',
    related_name='executions',
    on_delete=models.CASCADE
  )
  
```
  The trickiest part of this project was figuring out how to calculate some of the key trade statistics such as net return and avg buy/sell price. I wasn’t sure where it would make the most sense to do this initially, but I did think it made the most sense to do these calculations on the backend. At first I added a function in a trade serializer to run the calculations, but I couldn’t get the calculated data to save and update the fields on the trade. The way I was able to get around this was by moving the calculations function to the executions controller, and running the calculations function each time an execution is added or updated. The controller displayed below adds an execution to the database and then calls the specific trade that the execution was added to and all the executions attached to the trade and then runs the calculations on that trade by passing the trade and executions in as arguments. The trade can then be serialized to save the fresh calculations to the trade.  

```

# POST Execution controller
# Description: Adds execution to the specified trade
def post(self, request):

  execution_to_add = ExecutionSerializer(data=request.data)
  try:
    if execution_to_add.is_valid():
      execution_to_add.save()
      trade = Trade.objects.get(pk=request.data['trade'])
      executions = Execution.objects.filter(trade=trade)
      # contains all values in the dict even if null
      data = set_trade_stats(executions, trade)

      serialized_trade = PopulatedTradeSerializer(trade, data=data, partial=True)
      if serialized_trade.is_valid():
        serialized_trade.save()

        return Response(serialized_trade.data, status.HTTP_201_CREATED)
      print(serialized_trade.errors)
      return Response(serialized_trade.errors, status.HTTP_422_UNPROCESSABLE_ENTITY)
    print(execution_to_add.errors)
    return Response(execution_to_add.errors, status.HTTP_422_UNPROCESSABLE_ENTITY)
  except Exception as e:
    print(e)
    return Response(str(e), status.HTTP_500_INTERNAL_SERVER_ERROR)

```

# Front End
  The front end of the project was built using React JS. This was the 3rd project that I used React JS. I chose to use the Bootstrap framework since it is the most well known, and has an easy to use dynamic navbar, which I thought would save me time. In the end Bootstrap was almost entirely cut out minus a couple of pages still using the Container, Row, Col, and Buttons from Bootstrap. I used Chakra in the previous project, and really appreciated how it made making pages responsive so easy. Some of the trade history web apps on the market don’t do a good job with having a mobile friendly design, so I made it a goal to make sure the entire web app was mobile friendly, and I believe I succeeded. 
  
  I also found some components from previous projects useful, so I brought those in, such as the Draft JS editor, DropZone, Cloudinary, and the filters from project 2. Draft JS was used to create the session notes to allow a user to format their notes. Cloudinary and Dropzone are used in the profile section to allow a user to upload a profile picture.
  In the next couple of paragraphs I’ll mention some of the things that I was happy to be able to implement. 
  
  While I was working on the sessions list page, I got the idea to show all the sessions in a list in a column on the left side of the page, and the main session information in the main section of the page with the idea to populate session details when the user clicks on a session tile instead of redirecting them to a new page. I was able to accomplish this by passing e.target.id into the Axios get request link. The code below shows the Axios request, and the image below shows the user interface.
  
```
// Get session from database
  const getSession = async (e) => {
    console.log(e.target.id)
    try {
      const { data } = await axios.get(`api/sessions/${e.target.id}/`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      setSessionData(data)
    } catch (err) {
      console.log(err.response.data)
      setErrors(err.response.data)
    }
  }
  
```
![session-page](/screenshots/session-page.png)

  In the backend I ran a lot of calculations, so I decided to run some calculations on the front end as well. In the above picture I have displayed some session stats which are based on trades opened during that session. In order to add a new session, a user needs to enter the session date, a rating, and notes on the front end. The backend also requires a session trades, and owner field, but the user does not need to enter these fields.  
  
  The owner field is added by using the getPayLoad function and extracts the user ID and saves it to the owner field. I added this function directly in the session object as shown in the code below.
  
```

const [ formFields, setFormFields ] = useState({
    session_date: '',
    session_rating: '',
    session_notes: '',
    session_trades: [],
    owner_of_session: getPayload().sub,
  })
  
```

  Adding in the session trades required making an axios get request to pull all user trades from the database. In a useEffect dependent on state trades, I looped through all trades and setup a conditional statement checking if the date opened on the trade is equal to the session date, and if it is, the trade is pushed into an array, and then this array is set to the session_trades field displayed above. The useEffect used for this is displayed below.

```

 useEffect(() => {
    const sessionTrades = []
    if (trades) {
      trades.map(trade => {
        if (trade.date_opened === formFields.session_date) {
          // console.log('trade match', trade)
          sessionTrades.push(trade.id)
        }
      }
      )
    }
    // console.log(sessionTrades)
    setFormFields({ ...formFields, session_trades: sessionTrades })
  }, [trades, formFields.session_date])

```

  Now that I have the trades made during the session, I was able to calculate the trade statistics to be displayed for each session. This required a new object to store the data in. The code below shows how I created the new object. 
  
```

useEffect(() => {
    if (sessionData.session_trades) {
      const stats = {
        trades: '',
        winners: '',
        losers: '',
        winRate: '',
        return: '',
      }

      const wins = []
      const losses = []
      const profit = []
      
      stats.trades = sessionData.session_trades.length
      
      sessionData.session_trades.map(trade => {
        profit.push(trade.net_return)
        if (trade.net_return > 0) wins.push(trade.id) 
        if (trade.net_return < 0) losses.push(trade.id)
      })
      // Calculations
      stats.winRate = Math.round((wins.length / (wins.length + losses.length)) * 100)
      stats.winners = wins.length
      stats.losers = losses.length
      stats.return = profit.length > 0 ? profit.reduce((prev, next) => prev + next, 0) : 0

      setDayStats(stats)
    }
  }, [sessionData.session_trades])
  
```

  On the single trade page I incorporated a TradingView widget which dynamically populated the trading symbol and timeframe to pull the correct chart from TradingView. This was done in a separate component that was placed into the single trade page. The component is shown below. 

```

useEffect(() => {
    new TradingView.widget(
      {
        'autosize': true,
        'symbol': trade.symbol,
        'interval': trade.timeframe,
        'timezone': 'Etc/UTC',
        'theme': 'light',
        'style': '1',
        'locale': 'en',
        'toolbar_bg': '#f1f3f6',
        'enable_publishing': false,
        'allow_symbol_change': true,
        'container_id': 'tradingview_38969',
      }
    )
  }, [trade])

  return (
    <div className="tradingview-chart-container">
      <div id="tradingview_38969">
      </div>
    </div>
  )
}

```

  I also wanted to display the company name on the single trade page without the user having to enter this information. I used a free API from polygon.io to pull this information based upon the symbol entered in the trade form. I inserted the trading symbol into the API link to request that specific company. The API also only worked with stocks, so I had to also add a conditional to check that the trade was a stock otherwise I left the company name section blank. 

  On the dashboard I displayed some overall account statistics which were calculated on the backend, and I used recharts to display a line graph showing cumulative account value performance over time. The code block below shows how I created the dashboard statistics, which was done in the PopulatedUserSerializer. 
  
```

class PopulatedUserSerializer(UserSerializer):
  trades = TradeSerializer(many=True)

  def set_account_stats(self):
    data = self.data

    total_return = []
    win = []
    loss = []
    cumulative_sum = []
    account_value = 0

    # loop through trades to select trades that have a net_return
    for trade in data['trades']:
      if trade['net_return']:
        total_return.append(trade['net_return'])
        if trade['net_return'] > 0:
          win.append(trade['net_return'])
        if trade['net_return'] < 0:
          loss.append(trade['net_return'])
    
    for i in total_return:
      account_value += i
      cumulative_sum.append(round(account_value, 2))
  
    data['total_return'] = round(account_value, 2)
    data['total_trades'] = len(data['trades'])
    data['avg_return_per_trade'] = round(sum(total_return) / len(data['trades']), 2)
    data['win_ratio'] = '100%' if len(loss) == 0 else round((len(win)/ (len(win) + len(loss))) * 100)
    data['account_value'] = cumulative_sum

    return data
    
```

  The next code block shows how I created the new object to be used in the graph and also how the graph was implemented in the code. The graph was a separate component. That was plugged into the dashboard. 
  
```

useEffect(() => {
    const value = []
    if (accountData.account_value) {
      accountData.account_value.map((num, i) => {
        value.push({
          id: i + 1,
          totalValue: num,
        })
      })
    }
    setAccountValue(value)
  }, [accountData.account_value])

  return ( 
    <>
      {tradeData && chartData ? 
        <>
          <div className="graph-title"><h6>Account Value Evolution</h6></div>
          <div className="graph-container">
            <ResponsiveContainer width="100%" height="100%" >
              <LineChart
                className="graph-container"
                width={window.innerWidth}
                height={250}
                data={accountValue}
                backgroundColor={'#00ff00'}
                wrapperStyle={{ backgroundColor: '#00ff00' }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="id" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="totalValue" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </>
        :
        errors ? <p>{errors}</p> : <p>Loading...</p>
      }
    </>
  )
}

```

  Earlier I mentioned I put in some effort to dynamically target the many dropdown choices needed for the trade form. Adding this ability reduced a lot of code needed to create the form on the front end. I was able to use a couple of map functions to dynamically populate the dropdown menus. The labels were also populated dynamically, which caused them to display as snake case since the labels were a variable on the backend. To remove the snake casing I used the incluces method to check if “_” existed, and then replaced the “_” with a space, then I capitalized the first letter. The code I used to accomplish all of this is displayed below. 
  
```

{/* Dropdown selectors class */}
{formModel && formModel.map((data, i)=> {

  return (
    <>
      <label key={i} htmlFor={data.name}>{data.name.includes('_') ? 
        data.name.charAt(0).toUpperCase() + data.name.slice(1).replace('_', ' ') 
        :  
        data.name.charAt(0).toUpperCase() + data.name.slice(1)}
      </label>
      <select 
        name={data.name} 
        className="trade-form-input" 
        onChange={handleChange}
        value={formFields.item}
      >
        {data.choices && data.choices.map((item, i) => {
          return (
            <option key={i} value={item[0]}>{item[1]}</option>
          )
        })}
      </select>
    </>
  )
})}

```

# Wins
- After 8 days of long hours, a lot of hair pulling, and head scratching, I am really happy with the result, and all the features I was able to add. The product is easy to use, and I will be using it for myself. 
- Before I started coding, I was unsure how I would implement all of the calculations and where they needed to be. I used my own trading experience and existing trade tracking spreadsheets that I used in the past, plus existing competition to come up with what calculations were important for an MVP. I started adding the calculations to the trade execution serializer, but ran into problems saving the data, so I moved the calculations to run every time an execution controller is used.
- Coded the ability to have as many executions as needed with automatic calculations. This has always been a problem of mine. I used spreadsheets in the past and always had the problem of adding multiple executions, so it was a problem that I wanted to solve. I also find spreadsheets clunky and not easy to read, so that was another motivation for doing this project. 
- In the sessions page you can review past sessions without having to switch to a different page. This is something that I wanted to learn how to do as I see this being used a lot more often. On the left side a list of sessions is displayed and with a scrollbar. A user can click on a session, and the information from the session is populated on the page without leaving the page.
- Reused components from the previous project and integration was easy, and worked well.
- The web app was designed with a mobile first approach, so it is mobile friendly, which was difficult to accomplish for this kind of app. I think it’s still better to use on a desktop, but it’s easy to view information on a phone. 

# Challenges
- Getting the calculations saved to the trade was a big challenge, as well as populating the trade form dropdown choices. I struggled with these 2 things, and was relieved and happy to get it done. As I described above in my wins, this took a few attempts at determining where to place the calculations.
- I was extremely ambitious with my plans, and initially found it hard to figure out where to start and what to prioritize. I solved the issue by really focusing on the fundamentals of what was critical to have and continue building up from there. In the end I had to drop the reports section as I prioritized making all of the functions bug free.
- Using Bootstrap became cumbersome as I improved styling. I mainly chose to use Bootstrap for the dynamic navbar, and for the use of the containers, rows, columns, and buttons. In the end I found it more productive to style everything from scratch. 

# Future Improvements
- I didn’t have time to code short side calculations, so I need to add a conditional that checks if the trade is on the short side, and change the calculations if the trade is short.
- One of my goals that I had to drop was adding a reports section. This section would utilize a lot of graphs/charts and needs more calculations on the backend. The goal here is to help traders determine key insights into their trading performance to discover new insights that they may not know about. 
- I need to add the ability for a user to update their password, and I want to do this by having the user click a change password button on their profile edit page, and have the section become visible. I believe I need to do this with a separate serializer and put request. 
- The setup section and mistakes section needs some updating, as the user can enter any text. I am thinking a user should enter common setups and mistakes in their profile/settings and have them select from these options when adding a trade. This would help with filters, and sorting.

# Bugs
- In the sessions page on a phone, the scrollbar overflows its container. Didn’t have time to fix this issue, as it was not clear what was causing it to overflow.
- The short calculation is not set up yet, and I have not optimized the forms for options, and forex trades.

# Key Learnings
- Initially I found Django confusing as I didn’t feel like I had a good understanding of how it worked. By pushing myself with this project, I feel much more comfortable working with Dango and really enjoy using it now.  The serializers and controllers were much more difficult for me to understand than NodeJS and MongoDB. 
- React.js is becoming much more familiar. I feel I have a good understanding of hooks and how to use them. Updating on dependencies was important in this project along with using conditionals to ensure a state has been updated before trying to run a function on something that is undefined or falsey.
- Bootstrap is not my friend. I really like how Sass works and find custom coding the styling much easier than using the Bootstrap framework. I used both flexbox and flex grid in this project, and feel much more comfortable with how these tools work.
- Reusability. I also worked hard to make sure I was reusing components and not writing redundant code. I see the value in using components in React JS, and really like this functionality. 
