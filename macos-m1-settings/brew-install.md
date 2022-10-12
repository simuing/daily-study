## M1 Homebrew Setting

Homebrew installation on apple silicon, step by step:
- Open a terminal window (it should be zsh)

Run this command:
```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```


Then create .zshrc on home directory (If it was not created yet). Just run on terminal:
```
touch ~/.zshrc
```

Then open it to edit with TextEdit
(Is a hidden file. You can show hidden files with shift + command + . )

Add this line at the end of .zshrc
```
export PATH=/opt/homebrew/bin:$PATH
```

Run this command in terminal to make this available:
```
source ~/.zshrc
```

Now just run this command to be sure that everything is working:
```
brew help

```


--
source: https://stackoverflow.com/questions/66666134/how-to-install-homebrew-on-m1-mac