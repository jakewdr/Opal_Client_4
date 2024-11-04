# Why?

ev.io can run very bad on computers with a low refresh rate monitor, with the default settings in chrome a shit ton of latency is added due to vsync and some other chromium engine flaws.

Opal client uses chromium switches and gama's community patch to run the game uncapped at a smooth frame rate and lower latency!

# Shoutouts 

[Panda](https://github.com/PandasMagic/Comp-Client) -> The preload.js file which I've adapted for this client (exit button).

[MR2K](https://github.com/m2rk1312) -> Some client ideas, and some inspiration I got from working on his client project.

[Gama](https://chrome.google.com/webstore/detail/community-patch-evio/ifoamcioafnhbhakboliekfopmefahip) -> His community patch fixes some big issues with the game, the extension has been obfuscated for his code's safety!

# How to run

Firstly you need [node.js](https://nodejs.org/) (version 16 or above), [git](https://git-scm.com/downloads) and install [yarn](https://www.npmjs.com/package/yarn) globally.

Run:

    git clone https://github.com/OhPool/Opal_Client_4

Then run:

    yarn install

Finally run: 

    yarn run start

# How to build

    yarn run build

This command will create an unpacked windows version of the client.

# Shortcuts

Use f5 to reload the page

Use f6 to open the original https://ev.io/ page

Use f7 to open the link stored in your clipboard (you copy an ev.io private game link then join it by pressing f7)

Use f8 to go to the https://ev.io/user/login/ page

Use f9 to close the app!

Use f11 to go full-screen!

# Contact

Contact me on discord if you have any questions (slintfan)

# Contribution

Please submit pull requests if this is something you are interested in (I'd probably merge them)