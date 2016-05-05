[![Build Status](https://travis-ci.org/CodeFalling/elpa-mirror.svg?branch=master)](https://travis-ci.org/CodeFalling/elpa-mirror)

## 安装
```elisp
(add-to-list 'package-archives
            '("popkit" . "https://coding.net/u/codefalling/p/melpa-mirror/git/raw/master/"))
```

## spacemacs
找到 ~/.emacs.d/core/core-configuration-layer.el文件里的代码段
```elisp
(defvar configuration-layer--elpa-archives
  '(("melpa" . "melpa.org/packages/")
    ("org"   . "orgmode.org/elpa/")
    ("gnu"   . "elpa.gnu.org/packages/"))
  "List of ELPA archives required by Spacemacs.")

```
将melpa源替换为emacs-china源：

```elisp
(defvar configuration-layer--elpa-archives
  '(("emacs-china" . "coding.net/u/codefalling/p/melpa-mirror/git/raw/master/")
    ("org"   . "orgmode.org/elpa/")
    ("gnu"   . "elpa.gnu.org/packages/"))
  "List of ELPA archives required by Spacemacs.")
