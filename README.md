[![Build Status](https://travis-ci.org/CodeFalling/elpa-mirror.svg?branch=master)](https://travis-ci.org/CodeFalling/elpa-mirror)

## 安装
```elisp
(setq package-archives '(("gnu-china" . "https://git.oschina.net/EmacsChina/elpa/raw/master/gnu/")
             ("org-china" . "https://git.oschina.net/EmacsChina/elpa/raw/master/org/")
             ("melpa-china" . "https://git.oschina.net/EmacsChina/elpa/raw/master/melpa/")))
```

`https` 不能正常工作的可以改成 `http`

## spacemacs
找到 ~/.emacs.d/core/core-configuration-layer.el文件里的代码段
```elisp
(defvar configuration-layer--elpa-archives
  '(("melpa" . "melpa.org/packages/")
    ("org"   . "orgmode.org/elpa/")
    ("gnu"   . "elpa.gnu.org/packages/"))
  "List of ELPA archives required by Spacemacs.")

```

替换为emacs-china源：

```elisp
(defvar configuration-layer--elpa-archives
  '(("melpa-china" . "git.oschina.net/EmacsChina/elpa/raw/master/melpa/")
    ("gnu-china"   . "git.oschina.net/EmacsChina/elpa/raw/master/gnu/")
    ("org-china"   . "git.oschina.net/EmacsChina/elpa/raw/master/org/")
    )
  "List of ELPA archives required by Spacemacs.")
```
