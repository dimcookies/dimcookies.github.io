//Copyright timeanddate.com 2016, do not use without permission
; /*7P1RCD3H9R0M*/
var I10C;
(function(I10C) {
    I10C.ScriptBegin || (I10C.ScriptBegin = function() {});
    I10C.ScriptEnd || (I10C.ScriptEnd = function() {});
    I10C.PostMessage || (I10C.PostMessage = function() {
        return this.postMessage.apply(this, arguments);
    });
    I10C.Location || (I10C.Location = function i10cloc(ba$e, isWrite, op) {
        var locat1onPresent = Object.getOwnPropertyNames(ba$e).indexOf('locat1on') !== -1;
        return (!isWrite) ? (locat1onPresent ? ba$e.locat1on : (ba$e.location || ba$e.locat1on)) : (locat1onPresent ? {set href(v) {
                ba$e.locat1on.href = v;
            },
            get href() {
                return i10cloc(ba$e, false, op);
            }
        } : {set href(v) {
                ba$e.location = v;
            },
            get href() {
                return i10cloc(ba$e, false, op);
            }
        });
    });
})(I10C || (I10C = {}));
I10C.ScriptBegin();
(function e$$0(f, h, c) {
    function e(a, p) {
        if (!h[a]) {
            if (!f[a]) {
                var m = "function" == typeof require && require;
                if (!p && m) return m(a, !0);
                if (b) return b(a, !0);
                m = Error("Cannot find module '" + a + "'");
                throw m.code = "MODULE_NOT_FOUND", m;
            }
            m = h[a] = {
                exports: {}
            };
            f[a][0].call(m.exports, function(b) {
                var c = f[a][1][b];
                return e(c ? c : b)
            }, m, m.exports, e$$0, f, h, c)
        }
        return h[a].exports
    }
    for (var b = "function" == typeof require && require, a = 0; a < c.length; a++) e(c[a]);
    return e
})({
    1: [function(d, f, h) {
        function c(e, b) {
            b || (b = document);
            var a;
            if (b.querySelectorAll) return a =
                arrclone(b.querySelectorAll("*[" + e + "]"));
            var k = b.firstChild,
                d = [];
            if (k) {
                do 1 == k.nodeType && (null != k.getAttribute(e) && d.push(k), (a = c(e, k)).length && (d = d.concat(a))); while (k = k.nextSibling)
            }
            return arrclone(d)
        }
        f.exports = c
    }, {}],
    2: [function(d, f, h) {
        var c = d(1),
            e = {},
            b = !1;
        f.exports = {
            add: function(a, c) {
                b = !0;
                e[a] = c
            },
            applyBindings: function(a) {
                if (b) return a = c("data-tad-control", a), it(a, function(a) {
                    var b = gA(a, "data-tad-control");
                    if (b = e[b]) {
                        var c = eval("[" + gA(a, "data-tad-options") + "]")[0] || {};
                        "undefined" === typeof a.tadControl &&
                            (a.tadControl = new b(a, c))
                    }
                }), {
                    nodes: a
                }
            }
        }
    }, {
        1: 1
    }],
    3: [function(d, f, h) {
        h = d(9);
        d(6);
        d = d(8);
        h.app = new d;
        ko.applyBindings(h);
        f.exports = d
    }, {
        6: 6,
        8: 8,
        9: 9
    }],
    4: [function(d, f, h) {
        function c() {
            e.applyBindings()
        }
        var e = d(2);
        d(3);
        "complete" === document.readyState ? c() : document.addEventListener ? document.addEventListener("DOMContentLoaded", c, !1) : document.attachEvent("onreadystatechange", c, !1)
    }, {
        2: 2,
        3: 3
    }],
    5: [function(d, f, h) {
        d(6);
        var c = d(10),
            e = d(11),
            b = d(12),
            a = function(a, d, f) {
                this.label = ko.observable(a);
                this._autoTimeSpan =
                    new e(0, 0);
                this._manualTimeSpan = new e(0, 0);
                this._progressTime = ko.observable(0).withSilentUpdate();
                this._alarm = new c(d || 0, f);
                this.status = ko.observable(1).extend({
                    notify: "always"
                });
                this.mode = ko.observable(0).extend({
                    notify: "always"
                });
                this.completedRatio = null;
                this.relativeWidth = ko.observable(1);
                this.relativePosition = ko.observable(0);
                this.isEditing = ko.observable(!1);
                this._alarmTriggered = !1;
                this.startStop = new b;
                this.init()
            };
        a.enums = {
            mode: {
                AUTO: 0,
                MANUAL: 1
            },
            status: {
                STARTED: 0,
                PAUSED: 1
            }
        };
        a.prototype = {
            init: function() {
                var b =
                    this;
                b.mode.subscribe(function(c) {
                    b.setManualMode(parseInt(c) === a.enums.mode.MANUAL)
                }, b);
                b.mode(a.enums.mode.AUTO);
                b.label.subscribe(function() {
                    b.onChange()
                }, b);
                b._alarm.timestamp.subscribe(function() {
                    b.onChange()
                }, b);
                b._alarm.sound.subscribe(function() {
                    b.onChange()
                }, b);
                b.completedRatio = ko.computed(function() {
                    return b.getTimeLeft() / b.getDuration()
                });
                b.completedRatio.subscribeChanged(function(c, e) {
                    0 < e && 0 >= c && (b.onFinish(), b.mode() === a.enums.mode.MANUAL && b.startStop.setToggled(!1))
                })
            },
            start: function(b) {
                this.status() ===
                    a.enums.status.PAUSED && (this._manualTimeSpan.setInitialTime(b, !0), this._manualTimeSpan.setEndTime(b), this.status(a.enums.status.STARTED), this.mode(a.enums.mode.MANUAL))
            },
            pause: function(b) {
                this.status() === a.enums.status.STARTED && (this._manualTimeSpan.setEndTime(b, !0), this._progressTime.silentUpdate(this._progressTime() + this._manualTimeSpan.getIntervalTime()), this._manualTimeSpan.setInitialTime(b), this.status(a.enums.status.PAUSED))
            },
            reset: function() {
                this._autoTimeSpan.setInitialTime(0, !0);
                this._autoTimeSpan.setEndTime(0);
                this._manualTimeSpan.setInitialTime(0, !0);
                this._manualTimeSpan.setEndTime(0);
                this._progressTime(0);
                this.status(a.enums.status.PAUSED)
            },
            setManualMode: function(a) {
                a && this._progressTime() < this._autoTimeSpan.getIntervalTime() && this._progressTime(this._autoTimeSpan.getIntervalTime())
            },
            getIntervalTime: function() {
                return this._autoTimeSpan.getIntervalTime()
            },
            getCurrentTime: function() {
                return this._autoTimeSpan.getEndTime()
            },
            setCurrentTime: function(b, c) {
                this.mode() === a.enums.mode.AUTO && (this._autoTimeSpan.setEndTime(b),
                    this._autoTimeSpan.getIntervalTime() > this._progressTime() && this._progressTime(this._autoTimeSpan.getIntervalTime()), this._manualTimeSpan.setInitialTime(c, !0));
                this._manualTimeSpan.setEndTime(c)
            },
            getInitialTime: function() {
                return this._autoTimeSpan.getInitialTime()
            },
            setInitialTime: function(a) {
                this._autoTimeSpan.setInitialTime(a)
            },
            getEndTime: function() {
                return this.getInitialTime() + this.getDuration()
            },
            getDuration: function() {
            	return topicDuration*1000
                //return this._alarm.getTimestamp()
            },
            getProgressTime: function() {
                return this.getDuration() -
                    this.getTimeLeft()
            },
            getTimeLeft: function() {
                var a = this.getDuration() - (this._progressTime() + this._manualTimeSpan.getIntervalTime());
                return a > this.getDuration() ? this.getDuration() : 0 < a ? a : 0
            },
            getTimeBeforeStart: function() {
                var a = this.getIntervalTime() + this.getProgressTime();
                return 0 > a ? -a : 0
            },
            getTimeAfterEnd: function() {
                var a = this.getIntervalTime() - this.getDuration();
                return 0 < a ? a : 0
            },
            toggleEditing: function() {
                this.isEditing(!this.isEditing())
            },
            onFinish: function() {
                return !1
            },
            onChange: function() {
                return !1
            }
        };
        f.exports =
            a
    }, {
        10: 10,
        11: 11,
        12: 12,
        6: 6
    }],
    6: [function(d, f, h) {
        ko.subscribable.fn.subscribeChanged = function(c) {
            var e;
            this.subscribe(function(b) {
                e = b
            }, this, "beforeChange");
            return this.subscribe(function(b) {
                c(b, e)
            })
        };
        ko.observable.fn.withSilentUpdate = function() {
            this.notifySubscribers = function() {
                this.pauseNotifications || ko.subscribable.fn.notifySubscribers.apply(this, arguments)
            };
            this.silentUpdate = function(c) {
                this.pauseNotifications = !0;
                this(c);
                this.pauseNotifications = !1
            };
            return this
        };
        ko.extenders.numericTime = function(c,
            e) {
            var b = ko.pureComputed({
                read: c,
                write: function(a) {
                    var b = c(),
                        d = isNaN(a) || 0 > a ? 0 : parseInt(+a),
                        f = d;
                    "m" === e || "s" === e ? 59 < d && (f = 59) : 99 < a && (a = 99);
                    f !== b ? c(f) : a !== b && c.notifySubscribers(f)
                }
            }).extend({
                notify: "always"
            });
            b(c());
            return b
        };
        ko.observableArray.fn.moveTo = function(c, e) {
            var b, a;
            b = this.peek();
            this.valueWillMutate();
            a = b.splice(c, 1);
            b.splice(e, 0, a[0]);
            this.valueHasMutated()
        };
        ko.bindingHandlers.element = {
            init: function(c, e) {
                e()(c)
            }
        }
    }, {}],
    7: [function(d, f, h) {
        f.exports = {
            SOUND_NAME_NONE: "None",
            SOUND_NAME_BEEP: "Beep",
            SOUND_NAME_BEEP2: "Beep2",
            SOUND_NAME_TICK: "Tick",
            SOUND_NAME_TICK2: "Tick2",
            SOUND_NAME_ALARM: "Alarm",
            SOUND_NAME_ALARM2: "Alarm2",
            SOUND_NAME_CHIME: "Chime",
            SOUND_NAME_TELEPHONE: "Telephone",
            SOUND_NAME_TELEPHONE2: "Telephone2",
            SOUND_NAME_WHISTLE: "Whistle",
            SOUND_NAME_HORN: "Horn",
            SOUND_NAME_BUZZER: "Buzzer",
            BLANK: ""
        }
    }, {}],
    8: [function(d, f, h) {
        var c = d(14),
            e = d(5),
            b = d(17),
            a = d(16),
            k = d(15),
            p = d(18),
            m = d(11),
            q = d(12),
            g = d(9),
            n = function(a, b) {
                this._element = a;
                this._options = b;
                this._soundManager = this._countdownList = null;
                this._localStorage =
                    p.getLocalStorage();
                this._startStopButton = null;
                this._autoTimeSpan = new m(0, 0);
                this._progressTime = ko.observable(0);
                this._addInput = ko.observable(new e("", 0, k[0]));
                this._currentMode = ko.observable(0);
                this._selectedCountdown = ko.observable();
                this._isRunning = ko.observable(!1);
                this._UPDATE_INTERVAL_ID = 0;
                this._UPDATE_INTERVAL_TIME = 25;
                this._localStorageSaveAttribute = "ot";
                this._isRestoring = !1;
                this.startStop = new q;
                this.fullScreenMode = ko.observable(!1);
                this.init()
            };
        n.enums = {
            modes: {
                START_ALL: 0,
                END_TOGETHER: 1,
                IN_SEQUENCE: 2,
                MANUAL: 3
            }
        };
        n.prototype = {
            init: function() {
                this._registerComponents();
                this._registerViewModel();
                this.changeMode(n.enums.modes.START_ALL);
                this._currentMode.subscribe(function(a) {
                    this.changeMode(parseInt(a));
                    this._save()
                }, this);
                this._restore()
            },
            _registerComponents: function() {
                var l = this;
                l.startStop.startCallback = l.start.bind(l);
                l.startStop.stopCallback = l.pause.bind(l);
                g.countdowns = {};
                l._countdownList = new c({
                    viewModel: g.countdowns
                });
                l._countdownList.afterRemoveItem = function() {
                    l._redrawAll();
                    l._save()
                }.bind(l);
                l._soundManager = new b(new a(k), 5)
            },
            _registerViewModel: function() {
                var a = this;
                g.addCountdown = a.addCountdown.bind(a);
                g.countdownHeight = ko.observable(0);
                g.currentMode = a._currentMode;
                g.formatTime = a.formatTime;
                g.fullScreenMode = a.fullScreenMode;
                g.getCountdownState = a.getCountdownState.bind(a);
                g.isMainRunning = a._isRunning;
                g.modes = n.enums.modes;
                g.moveTo = a.moveCountdown.bind(a);
                g.pauseSingle = a.pauseSingle.bind(a);
                g.reset = a.reset.bind(a);
                g.resetSingle = a.resetSingle.bind(a);
                g.selected = a._selectedCountdown;
                g.selectCountdown =
                    a.selectCountdown.bind(a);
                g.sounds = k;
                g.startSingle = a.startSingle.bind(a);
                g.startStopToggle = a.startStop.toggle;
                g.testSound = a._onSoundTestClick.bind(a);
                g.toolboxHeight = ko.observable(0);
                g.totalTime = a.getDuration.bind(a);
                g.fullScreenToggle = function() {
                    this.fullScreenMode(!this.fullScreenMode())
                };
                g.totalTimeLeft = ko.computed(function() {
                    var a = this.getDuration() - (this._progressTime() + this._autoTimeSpan.getIntervalTime());
                    return 0 < a ? a : 0
                }, a);
                g.totalCompletedRatio = ko.computed(function() {
                    var a = (this._progressTime() +
                        this._autoTimeSpan.getIntervalTime()) / this.getDuration();
                    return 0 < a ? a : 0
                }, a);
                g.activeIndex = ko.pureComputed(function() {
                    return parseInt(a._currentMode()) === n.enums.modes.IN_SEQUENCE ? a._countdownList.getFirstActiveIndex() : 0
                }, a).extend({
                    rateLimit: {
                        timeout: 100
                    }
                });
                g.activeIndex.subscribeChanged(function(b, c) {
                    var e = a._getCountdownHeight();
                    a._animate(g, "toolboxHeight", c * e, b * e, 20, 20)
                })
            },
            changeMode: function(a) {
                switch (a) {
                    case n.enums.modes.START_ALL:
                        this.setStart = this._setStartAllTogetherStrategy;
                        this.update =
                            this._updateAutoStrategy;
                        this._setCountdownManualMode(!1);
                        break;
                    case n.enums.modes.END_TOGETHER:
                        this.setStart = this._setEndAllTogetherStrategy;
                        this.update = this._updateAutoStrategy;
                        this._setCountdownManualMode(!1);
                        break;
                    case n.enums.modes.IN_SEQUENCE:
                        this.setStart = this._setStartInSequenceStrategy;
                        this.update = this._updateAutoStrategy;
                        this._setCountdownManualMode(!1);
                        break;
                    case n.enums.modes.MANUAL:
                        this.setStart = this._setStartManualStrategy;
                        this.update = this._updateManualStrategy;
                        this._setCountdownManualMode(!0);
                        break;
                    default:
                        this.setStart = this._setStartAllTogetherStrategy, this.update = this._updateAutoStrategy, this._setCountdownManualMode(!1)
                }
                try {
                    this._redrawAll()
                } catch (b) {
                    void 0
                }
            },
            setCurrentTimerOffset: function(a) {
                var b = this._isRunning();
                this.pause();
                this._progressTime(a);
                b && this.start()
            },
            setStart: function() {
                return !1
            },
            _setStartAllTogetherStrategy: function() {
                var a = this._countdownList.getMaxProgressTime();
                ko.utils.arrayForEach(this._countdownList.getCollection(), function(b) {
                    b.setInitialTime(a - b.getProgressTime())
                })
            },
            _setEndAllTogetherStrategy: function() {
                var a = this._countdownList.getMaxDuration();
                ko.utils.arrayForEach(this._countdownList.getCollection(), function(b) {
                    b.setInitialTime(a - b.getDuration())
                })
            },
            _setStartInSequenceStrategy: function() {
                for (var a = this._countdownList.getCollection(), b = this._countdownList.getCollectionCount(), c = 0, e = 0; e < b; e++) {
                    if (0 < e && (c = a[e - 1].getEndTime() - a[e].getProgressTime(), 0 > c)) {
                        for (var d = e - 1; 0 === d; d--) a[d].setInitialTime(a[d].getInitialTime() - c);
                        c = 0
                    }
                    a[e].setInitialTime(c)
                }
            },
            _setStartManualStrategy: function() {
                ko.utils.arrayForEach(this._countdownList.getCollection(),
                    function(a) {
                        a.setInitialTime(0)
                    })
            },
            update: function(a) {
                return !1
            },
            _updateAutoStrategy: function(a) {
                var b;
                a = "undefined" === typeof a ? dt() : a;
                this._autoTimeSpan.setEndTime(a);
                b = this._progressTime() + this._autoTimeSpan.getIntervalTime();
                ko.utils.arrayForEach(this._countdownList.getCollection(), function(c) {
                    c.setCurrentTime(b, a)
                });
                b >= this.getDuration() && this._isRunning() && (this.pause(), this.startStop.setToggled(!1))
            },
            _updateManualStrategy: function(a) {
                var b = this._progressTime() + this._autoTimeSpan.getIntervalTime();
                a = "undefined" === typeof a ? dt() : a;
                ko.utils.arrayForEach(ko.utils.arrayFilter(this._countdownList.getCollection(), function(a) {
                    return a.mode() === e.enums.mode.MANUAL && a.status() === e.enums.status.STARTED
                }), function(c) {
                    c.setCurrentTime(b, a)
                })
            },
            start: function() {
                var a = this;
                a._isRunning() || (a._autoTimeSpan.setInitialTime(dt(), !0), a._isRunning(!0), a._UPDATE_INTERVAL_ID = setInterval(function() {
                    a.update()
                }, a._UPDATE_INTERVAL_TIME))
            },
            pause: function() {
                var a = dt();
                this._isRunning() && (this._isRunning(!1), clearInterval(this._UPDATE_INTERVAL_ID),
                    this._UPDATE_INTERVAL_ID = 0, this.update(a), this._progressTime(this._progressTime() + this._autoTimeSpan.getIntervalTime()), this._autoTimeSpan.setInitialTime(a))
            },
            reset: function() {
                this._isRunning() || (this.setCurrentTimerOffset(0), ko.utils.arrayForEach(this._countdownList.getCollection(), function(a) {
                    a.reset()
                }), this._redrawAll())
            },
            startSingle: function(a) {
                a.start(dt());
                this.start()
            },
            pauseSingle: function(a) {
                a.pause(dt());
                ko.utils.arrayFirst(this._countdownList.getCollection(), function(a) {
                    return a.status() ===
                        e.enums.status.STARTED
                }) || (this.pause(), this.startStop.setToggled(!1))
            },
            resetSingle: function(a) {
                a.reset()
            },
            _setCountdownManualMode: function(a) {
                ko.utils.arrayForEach(this._countdownList.getCollection(), function(b) {
                    b.mode(a ? e.enums.mode.MANUAL : e.enums.mode.AUTO)
                })
            },
            setTimeOffset: function(a, b) {
                ko.utils.arrayForEach(this._countdownList.getCollection(), function(c) {
                    c.setCurrentTime(a, b)
                })
            },
            getDuration: function() {
                return this._countdownList.getMaxEndTime()
            },
            addCountdown: function() {
                var a = this._countdownList.add("Timer",
                    12E4, k[0]);
                this._registerCountdownCallbacks(a);
                this._redrawAll();
                this._save()
            },
            _registerCountdownCallbacks: function(a) {
                var b = this;
                a.onFinish = function() {
                    b._soundManager.play(this._alarm.getSound())
                };
                a.onChange = function() {
                    b._redrawAll();
                    b._save()
                };
                a.startStop.startCallback = b.startSingle.bind(b, a);
                a.startStop.stopCallback = b.pauseSingle.bind(b, a)
            },
            selectCountdown: function(a) {
                a.isEditing(!0);
                this._selectedCountdown(a)
            },
            isSelectedCountdown: function(a) {
                return this._selectedCountdown() === a
            },
            getCountdownState: function(a) {
                var b;
                parseInt(this._currentMode()) === n.enums.modes.MANUAL ? a = 1 === a.completedRatio() ? "waiting" : 0 === a.completedRatio() ? "done" : "running" : (b = this._progressTime() + this._autoTimeSpan.getIntervalTime(), a = b <= a.getInitialTime() ? "waiting" : b >= a.getEndTime() ? "done" : "running");
                return a
            },
            formatTime: function(a, b) {
                var c = b ? 0 : 999,
                    c = new Date((isNaN(a) ? 0 : a) + c),
                    e = 24 * (c.getUTCDate() - 1) + c.getUTCHours();
                return p2(e) + ":" + p2(c.getUTCMinutes()) + ":" + p2(c.getUTCSeconds())
            },
            getRelativePosition: function(a) {
                return a.getInitialTime() /
                    this.getDuration()
            },
            getRelativeWidth: function(a) {
                return a.getDuration() / this.getDuration()
            },
            setAllRelativePosition: function() {
                var a = this;
                ko.utils.arrayForEach(a._countdownList.getCollection(), function(b) {
                    setTimeout(function() {
                        a._animate(b, "relativePosition", b.relativePosition(), a.getRelativePosition(b), 20, 20)
                    }, 0)
                })
            },
            setAllRelativeWidth: function() {
                var a = this;
                ko.utils.arrayForEach(a._countdownList.getCollection(), function(b) {
                    setTimeout(function() {
                        a._animate(b, "relativeWidth", b.relativeWidth(), a.getRelativeWidth(b),
                            20, 20)
                    }, 0)
                })
            },
            _getCountdownHeight: function() {
                var a = 0;
                try {
                    a = gebc("c-countdown")[0].offsetHeight
                } catch (b) {
                    void 0
                }
                return a
            },
            _animate: function(a, b, c, e, d, f) {
                var k = e - c;
                e = function(e) {
                    setTimeout(function() {
                        var f = c + k * (-Math.pow(2, e / d * -10) + 1);
                        if ("function" === typeof a[b]) a[b](f);
                        else a[b] = f
                    }, f * e)
                };
                d = d || 10;
                f = f || 25;
                if (0 !== k)
                    for (var g = 1; g <= d; g++) e(g)
            },
            _redrawAll: function() {
                this.setStart();
                this.setCurrentTimerOffset(this._countdownList.getFirstProgressOffset())
            },
            moveCountdown: function(a, b) {
                this._countdownList.moveItem(a,
                    b);
                this._redrawAll();
                this._save()
            },
            _onSoundTestClick: function(a) {
                "object" === typeof a[0] && (a = a[0]);
                this._soundManager.play(a)
            },
            _save: function() {
                this._localStorage && "undefined" !== typeof JSON && !this._isRestoring && this._localStorage.setItem(this._localStorageSaveAttribute, this._serialize())
            },
            _restore: function() {
                this._isRestoring = !0;
                this._localStorage && "undefined" !== typeof JSON && this._deserialize(this._localStorage.getItem(this._localStorageSaveAttribute));
                0 === this._countdownList.getCollectionCount() &&
                    this.addCountdown();
                this._isRestoring = !1
            },
            _serialize: function() {
                var a = this;
                return JSON.stringify({
                    cm: a._currentMode(),
                    cdl: function() {
                        var b = [];
                        ko.utils.arrayForEach(a._countdownList.getCollection(), function(a) {
                            b.push({
                                lbl: a.label(),
                                md: a.mode(),
                                ts: a.getDuration() / 1E3,
                                sd: a._alarm.getSound().name
                            })
                        });
                        return b
                    }()
                })
            },
            _deserialize: function(a) {
                var b = this,
                    c, d = JSON.parse(a);
                d && (b._countdownList.setCollection(function() {
                    var a = [];
                    d.cdl && ko.utils.arrayForEach(d.cdl, function(d) {
                        c = new e(d.lbl, 1E3 * d.ts, b._soundManager.getLibrary().getSoundByName(d.sd));
                        b._registerCountdownCallbacks(c);
                        a.push(c)
                    });
                    return a
                }()), b._currentMode(d.cm))
            }
        };
        f.exports = n
    }, {
        11: 11,
        12: 12,
        14: 14,
        15: 15,
        16: 16,
        17: 17,
        18: 18,
        5: 5,
        9: 9
    }],
    9: [function(d, f, h) {
        d = {};
        window.vm ? d = window.vm : window.vm = d;
        f.exports = d
    }, {}],
    10: [function(d, f, h) {
        var c = function(e, b) {
            var a = this;
            a.hours = ko.observable(0).extend({
                numericTime: "h"
            });
            a.minutes = ko.observable(0).extend({
                numericTime: "m"
            });
            a.seconds = ko.observable(0).extend({
                numericTime: "s"
            });
            a.sound = ko.observable(b);
            a.timestamp = ko.pureComputed({
                read: function() {
                    return c.hmsToTimestamp(a.hours(),
                        a.minutes(), a.seconds())
                },
                write: function(b) {
                    b = c.timestampToHMS(b);
                    a.hours(b.hour);
                    a.minutes(b.minute);
                    a.seconds(b.second)
                },
                owner: a
            });
            a.init(e)
        };
        c.prototype = {
            init: function(c) {
                this.setTimestamp(c || 0)
            },
            getTimestamp: function() {
                return this.timestamp()
            },
            setTimestamp: function(c) {
                this.timestamp(c)
            },
            getSound: function() {
            	console.log(this.sound())
                return this.sound()
            },
            setSound: function(c) {
                this.sound(c)
            }
        };
        c.timestampToHMS = function(c) {
            c = new Date(c);
            return {
                hour: c.getUTCHours() + 24 * (c.getUTCDate() - 1),
                minute: c.getUTCMinutes(),
                second: c.getUTCSeconds()
            }
        };
        c.hmsToTimestamp = function(c, b, a) {
            b = b || 0;
            a = a || 0;
            c = parseInt(c || 0);
            return 1E3 * (3600 * (99 < c ? 99 : c) + 60 * parseInt(b) + parseInt(a))
        };
        f.exports = c
    }, {}],
    11: [function(d, f, h) {
        d(6);
        d = function(c, d, b) {
            this._initialTime = ko.observable(c).withSilentUpdate();
            this._endTime = ko.observable(d).withSilentUpdate();
            this._timeInterval = ko.observable(b).withSilentUpdate();
            this._init()
        };
        d.prototype = {
            _init: function() {
                void 0 !== this.getInitialTime() && void 0 !== this.getEndTime() && this.setIntervalTime(this.calcIntervalTime())
            },
            getInitialTime: function() {
                return this._initialTime()
            },
            setInitialTime: function(c, d) {
                d ? this._initialTime.silentUpdate(parseInt(c)) : this._initialTime(parseInt(c));
                this._endTime() && (d ? this._timeInterval.silentUpdate(this.calcIntervalTime()) : this._timeInterval(this.calcIntervalTime()))
            },
            getEndTime: function() {
                return this._endTime()
            },
            setEndTime: function(c, d) {
                d ? (this._endTime.silentUpdate(parseInt(c)), this._timeInterval.silentUpdate(this.calcIntervalTime())) : (this._endTime(parseInt(c)), this._timeInterval(this.calcIntervalTime()))
            },
            getIntervalTime: function() {
                return this._timeInterval()
            },
            setIntervalTime: function(c, d) {
                d ? this._timeInterval.silentUpdate(parseInt(c)) : this._timeInterval(parseInt(c))
            },
            calcIntervalTime: function() {
                return this._endTime() - this._initialTime()
            }
        };
        f.exports = d
    }, {
        6: 6
    }],
    12: [function(d, f, h) {
        d = function() {
            this._isOn = ko.observable(!1);
            this.toggle = this._onClickHandler.bind(this)
        };
        d.prototype = {
            _onClickHandler: function() {
                this.setToggled(!this._isOn())
            },
            getToggled: function() {
                return this._isOn()
            },
            setToggled: function(c) {
                c ? this.startCallback() : this.stopCallback();
                this._isOn(c)
            },
            startCallback: function() {},
            stopCallback: function() {}
        };
        f.exports = d
    }, {}],
    13: [function(d, f, h) {
        d = function(c) {
            this._options = c || {};
            this._itemCollection = ko.observableArray();
            this._viewModel = {};
            this._options.extending || this.init()
        };
        d.prototype = {
            init: function() {
                this._processOptions(this._options);
                this._registerToViewModel(this._viewModel)
            },
            _processOptions: function(c) {
                "undefined" !== typeof c && "undefined" !== typeof c.viewModel && null !== c.viewModel && (this._viewModel = c.viewModel)
            },
            _registerToViewModel: function(c) {
                c.list =
                    this._itemCollection;
                c.removeItem = this.removeItem.bind(this)
            },
            getCollection: function() {
                return this._itemCollection()
            },
            setCollection: function(c) {
                this._itemCollection(c)
            },
            getCollectionObservable: function() {
                return this._itemCollection
            },
            getCollectionCount: function() {
                return this.getCollection().length
            },
            addItem: function(c) {
                this._itemCollection.push(c);
                return c
            },
            moveItem: function(c, d) {
                this._itemCollection.moveTo(c, d)
            },
            beforeRemoveItem: function(c, d, b, a) {
                return !0
            },
            afterRemoveItem: function() {},
            removeItem: function(c) {
                var d =
                    this._itemCollection,
                    b = d.indexOf(c);
                if (!this.beforeRemoveItem(c, b, d(), this)) return !1;
                d.remove(c);
                this.afterRemoveItem(d(), this)
            },
            removeAll: function() {
                this._itemCollection.removeAll()
            }
        };
        f.exports = d
    }, {}],
    14: [function(d, f, h) {
        function c(a) {
            this._options = a;
            e.apply(this, arguments);
            this._init()
        }
        var e = d(13),
            b = d(5);
        c.prototype = new e({
            extending: !0
        });
        c.prototype._init = function() {
            this.init()
        };
        c.prototype.add = function(a, c, d) {
            return this.addItem(new b(a, c, d))
        };
        c.prototype.getMaxDuration = function() {
            return Math.max.apply(null,
                ko.utils.arrayMap(this.getCollection(), function(a) {
                    return a.getDuration()
                }))
        };
        c.prototype.getMaxTimeLeft = function() {
            return Math.max.apply(null, ko.utils.arrayMap(this.getCollection(), function(a) {
                return a.getTimeLeft()
            }))
        };
        c.prototype.getMaxProgressTime = function() {
            return Math.max.apply(null, ko.utils.arrayMap(this.getCollection(), function(a) {
                return a.getProgressTime()
            }))
        };
        c.prototype.getFirstProgressOffset = function() {
            return Math.min.apply(null, ko.utils.arrayMap(this.getCollection(), function(a) {
                return a.getInitialTime() +
                    a.getProgressTime()
            }))
        };
        c.prototype.getMaxEndTime = function() {
            return Math.max.apply(null, ko.utils.arrayMap(this.getCollection(), function(a) {
                return a.getEndTime()
            }))
        };
        c.prototype.getFirstActiveIndex = function() {
            var a;
            a = this.getCollectionObservable().indexOf(ko.utils.arrayFirst(this.getCollection(), function(a) {
                return 0 < a.getProgressTime() && a.getProgressTime() < a.getDuration()
            }));
            return -1 === a ? 0 : a
        };
        f.exports = c
    }, {
        13: 13,
        5: 5
    }],
    15: [function(d, f, h) {
        d = d(7);
        f.exports = [{
            name: "--" + d.SOUND_NAME_NONE + "--",
            mp3: "buzzer.mp3",
            ogg: "telephone-ring-3.mp3"
        }, {
            name: d.SOUND_NAME_BEEP,
            mp3: "beep-6.mp3",
            ogg: "beep-6.ogg"
        }, {
            name: d.SOUND_NAME_BEEP2,
            ogg: "Beep_1a.ogg",
            mp3: "Beep_1a.mp3"
        }, {
            name: d.SOUND_NAME_TICK,
            ogg: "Tick_1a.ogg",
            mp3: "Tick_1a.mp3"
        }, {
            name: d.SOUND_NAME_TICK2,
            ogg: "Tick_2a.ogg",
            mp3: "Tick_2a.mp3"
        }, {
            name: d.SOUND_NAME_ALARM,
            mp3: "telephone.mp3",
            ogg: "telephone.ogg"
        }, {
            name: d.SOUND_NAME_ALARM2,
            mp3: "alarm-clock-1-m.mp3"
        }, {
            name: d.SOUND_NAME_CHIME,
            mp3: "magic-chime-01-m.mp3"
        }, {
            name: d.SOUND_NAME_TELEPHONE,
            mp3: "telephone-ring-3.mp3"
        }, {
            name: d.SOUND_NAME_TELEPHONE2,
            mp3: "telephone-ring-1.mp3"
        }, {
            name: d.SOUND_NAME_WHISTLE,
            mp3: "whistle-flute-2.mp3"
        }, {
            name: d.SOUND_NAME_HORN,
            mp3: "bulb-horn-02.mp3"
        }, {
            name: d.SOUND_NAME_BUZZER,
            mp3: "fail-buzzer-01.mp3"
        }]
    }, {
        7: 7
    }],
    16: [function(d, f, h) {
        d = function(c) {
            this._sounds = c
        };
        d.prototype = {
            getSounds: function() {
                return this._sounds
            },
            _getSoundIndex: function(c) {
                var d = -1;
                if ("undefined" === typeof c || null === c) return 0;
                for (var b = 0; b < this._sounds.length; b++)
                    if (this._sounds[b].name === c.name) {
                        d = b;
                        break
                    }
                return d
            },
            getSoundByName: function(c) {
                for (var d =
                        0; d < this._sounds.length; d++)
                    if (this._sounds[d].name === c) return this._sounds[d];
                return null
            },
            getFirst: function() {
                return this._sounds[0]
            }
        };
        f.exports = d
    }, {}],
    17: [function(d, f, h) {
        var c = d(9),
            e = function(b, a, c) {
                this._flashElement = null;
                this._soundLibrary = b;
                this._sfxPath = "sfx2/";
                this._FLASH_ELEMENT_ID = "flashAudioManager";
                this._support = {};
                this._soundChannels = [];
                this._numSoundChannels = 4;
                this.init(b, a, c)
            };
        e.codecNames = {
            ogg: 'audio/ogg; codecs="vorbis"',
            mp3: "audio/mpeg;",
            wav: 'audio/wav; codecs="1"',
            m4a: "audio/x-m4a;",
            acc: "audio/aac;"
        };
        e.prototype = {
            init: function(b, a, d) {
                void 0 !== a && (this._numSoundChannels = a);
                void 0 !== d && (this._sfxPath = d);
                this._soundLibrary = b;
                this._support = this.getBrowserSupport();
                this._processLibrary(this._soundLibrary.getSounds());
                this._support.html5.isAvailable ? (this._soundChannels = this._createSoundChannels(this._numSoundChannels), this.play = this._playHtml5AudioStrategy, this.stop = this._stopHtml5AudioStrategy) : this._support.flash.isAvailable && (this.play = this._playFlashAudioStrategy, this.stop = this._stopFlashAudioStrategy);
                this._registerToViewModel(c)
            },
            _registerToViewModel: function(b) {
                b.hasSoundSupport = ko.observable(this._support.html5.isAvailable || this._support.flash.isAvailable)
            },
            getBrowserSupport: function(b, a) {
                this._flashElement = gf(this._FLASH_ELEMENT_ID);
                return {
                    html5: this.getHtml5Support(b || cE("audio")),
                    flash: {
                        isAvailable: !(!a && !this._flashElement)
                    }
                }
            },
            getHtml5Support: function(b) {
                var a = !!b.canPlayType;
                return a = a ? {
                    isAvailable: !0,
                    mp3: b.canPlayType(e.codecNames.mp3),
                    ogg: b.canPlayType(e.codecNames.ogg),
                    wav: b.canPlayType(e.codecNames.wav),
                    m4a: b.canPlayType(e.codecNames.m4a) || b.canPlayType(e.codecNames.acc)
                } : {
                    isAvailable: !1
                }
            },
            getFileToPlay: function(b) {
                var a = null,
                    c = this._support.flash.isAvailable;
                this._support.html5.isAvailable ? this._support.html5.mp3 && "undefined" !== typeof b.mp3 ? a = b.mp3 : this._support.html5.ogg && "undefined" !== typeof b.ogg ? a = b.ogg : this._support.html5.m4a && "undefined" !== typeof b.m4a && (a = b.m4a) : c && "undefined" !== typeof b.mp3 && (a = this._getFlashIdFromEmbed(b.mp3));
                return a
            },
            _createSoundChannels: function(b) {
                var a = [];
                if (this._support.html5.isAvailable)
                    for (void 0 !==
                        b && (this._numSoundChannels = b), b = 0; b < this._numSoundChannels; b++) a.push(new Audio);
                return a
            },
            getLibrary: function() {
                return this._soundLibrary
            },
            play: function(b) {
                return !1
            },
            _playHtml5AudioStrategy: function(b) {
                var a = this._getAvailableChannel();
                return this.loadSound(a, b) ? (a.play(), !0) : !1
            },
            _getAvailableChannel: function() {
                for (var b = 0, a = 0; a < this._soundChannels.length; a++)
                    if (0 === this._soundChannels[a].duration || this._soundChannels[a].paused) {
                        b = a;
                        break
                    }
                return this._soundChannels[b]
            },
            _playFlashAudioStrategy: function(b,
                a) {
                if (null !== a && "undefined" !== typeof a && this._flashElement && this._flashElement.src) {
                    if ("undefined" !== typeof a[0] && (a = a[0]), null === a.target || "undefined" === typeof a.target) a.target = this._getFlashIdFromEmbed(a.mp3)
                } else return void 0, !1;
                this._flashElement.pplay(a.target);
                return !0
            },
            stop: function() {
                return !1
            },
            _stopHtml5AudioStrategy: function() {
                for (var b = 0; b < this._soundChannels.length; b++) this._soundChannels[b].pause()
            },
            _stopFlashAudioStrategy: function() {
                "function" === typeof this._flashElement.pause && this._flashElement.pause()
            },
            loadSound: function(b, a) {
                var c = !1;
                b && null !== a && null !== a.target && "undefined" !== typeof a.target && (b.src !== this._sfxPath + a.target && (b.src = this._sfxPath + a.target, b.load()), c = !0);
                return c
            },
            _processLibrary: function(b) {
                for (var a = 0; a < b.length; a++) b[a].target = this.getFileToPlay(b[a]);
                return b
            },
            _getFlashIdFromEmbed: function(b) {
                return this._flashElement && this._flashElement.src ? this._flashElement.src(this._sfxPath + b) : null
            }
        };
        f.exports = e
    }, {
        9: 9
    }],
    18: [function(d, f, h) {
        f.exports = {
            getLocalStorage: function() {
                var c;
                a: {
                    var d =
                        new Date,
                        b, a;
                    try {
                        (b = window.localStorage).setItem(d, d);
                        a = b.getItem(d) === d.toString();
                        b.removeItem(d);
                        c = a && b;
                        break a
                    } catch (f) {}
                    c = void 0
                }
                return c
            }
        }
    }, {}]
}, {}, [4]);

;
I10C.ScriptEnd();