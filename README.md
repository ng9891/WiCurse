# WiCurse
A Discord Bot to count profanity.

### Getting started:

#### Configure
1. Run
```bash
./prepare.sh
```

2. Make the necessary changes in `conf/user_config.toml`

3. Create a [Firebase](https://console.firebase.google.com) project and obtain your `serviceAccountKey.json` from the project settings

4. Place your `serviceAccountKey.json` inside `conf/`

#### Start up WiCurse
```bash
npm start
```

# Description
### Bot commands (credits to [@wizo06](https://github.com/wizo06))
```
!wc get <discord tag> [f:YYYY-MM-DD] [t:YYYY-MM-DD] [word1] [word2] ... [word n]    

<> means required    
[] means optional    

Examples:    

!wc get @wizo#0006    
!wc get @wizo#0006 total    
!wc get @wizo#0006 sh!t fck d4mn    
!wc get @wizo#0006 f:2019-08-01    
!wc get @wizo#0006 t:2019-08-30    
!wc get @wizo#0006 f:2019-08-01 t:2019-08-30    
!wc get @wizo#0006 f:2019-08-01 t:2019-08-30 sh!t fck d4mn
```

To add/delete words to the list:
```
!wc addword word1 word2 word3
!wc delword word1 word2 word3
```

Also extra commands for translation to english using the [Yandex API](https://translate.yandex.com/) added:  
```
!wc trans  /* link to Papago Naver Translate */
!wc trans 안녕하세요
```

### Database structure
The data from user is stored in 3 different collections in the Firestore Database:

* tracking: contains all the instances that got caught by the bot.
* curses: Keeps track of the total count for each word that an user has made.
* users: information about the user and total word count.

Structure to `tracking` is as follows:
```
tracking/UUID/:
			createdAt: timestamps
			curseWord: word
			id: DiscordID
			message: msg_that_got_catched_by_the_bot
			username: discord_username
```
* Remember to create index for `createdAt` field for faster date range query.

Structure to `curses` is as follows:
```
curses/DiscordID/:
			word1: 1
			word2: 3
			word3: 20
			...
			word4: 40
```
Structure to `users` is as follows:
```
users/DiscordID/:
			createdAt: timestamp
			total: 20
			username: user
```
### List of bad words
Although inefficient, currently the list of bad words are stored in a JSON file taken from [badwords](https://github.com/web-mech/badwords).   
I plan to integrate this list into the database in the near future.
___
### Credits
I want to thank [wizo06](https://github.com/wizo06) for helping me with the database design and also as the source of inspiration for this bot.

Author: vT