(function (e) {
	function t(t) {
		for (var o, r, s = t[0], l = t[1], c = t[2], p = 0, u = []; p < s.length; p++) r = s[p], Object.prototype.hasOwnProperty.call(i, r) && i[
			r] && u.push(i[r][0]), i[r] = 0;
		for (o in l) Object.prototype.hasOwnProperty.call(l, o) && (e[o] = l[o]);
		d && d(t);
		while (u.length) u.shift()();
		return n.push.apply(n, c || []), a()
	}

	function a() {
		for (var e, t = 0; t < n.length; t++) {
			for (var a = n[t], o = !0, s = 1; s < a.length; s++) {
				var l = a[s];
				0 !== i[l] && (o = !1)
			}
			o && (n.splice(t--, 1), e = r(r.s = a[0]))
		}
		return e
	}
	var o = {},
		i = {
			app: 0
		},
		n = [];

	function r(t) {
		if (o[t]) return o[t].exports;
		var a = o[t] = {
			i: t,
			l: !1,
			exports: {}
		};
		return e[t].call(a.exports, a, a.exports, r), a.l = !0, a.exports
	}
	r.m = e, r.c = o, r.d = function (e, t, a) {
		r.o(e, t) || Object.defineProperty(e, t, {
			enumerable: !0,
			get: a
		})
	}, r.r = function (e) {
		"undefined" !== typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
			value: "Module"
		}), Object.defineProperty(e, "__esModule", {
			value: !0
		})
	}, r.t = function (e, t) {
		if (1 & t && (e = r(e)), 8 & t) return e;
		if (4 & t && "object" === typeof e && e && e.__esModule) return e;
		var a = Object.create(null);
		if (r.r(a), Object.defineProperty(a, "default", {
				enumerable: !0,
				value: e
			}), 2 & t && "string" != typeof e)
			for (var o in e) r.d(a, o, function (t) {
				return e[t]
			}.bind(null, o));
		return a
	}, r.n = function (e) {
		var t = e && e.__esModule ? function () {
			return e["default"]
		} : function () {
			return e
		};
		return r.d(t, "a", t), t
	}, r.o = function (e, t) {
		return Object.prototype.hasOwnProperty.call(e, t)
	}, r.p = "/";
	var s = window["webpackJsonp"] = window["webpackJsonp"] || [],
		l = s.push.bind(s);
	s.push = t, s = s.slice();
	for (var c = 0; c < s.length; c++) t(s[c]);
	var d = l;
	n.push([0, "chunk-vendors"]), a()
})({
	0: function (e, t, a) {
		e.exports = a("cd49")
	},
	"00e9": function (e) {
		// e.exports = JSON.parse(
		// 	'{"cells":[{"type":"app.Message","size":{"width":368,"height":80},"ports":{"items":[{"group":"in","id":"6f7dad69-eb1d-49c7-a4b6-3790495afe93"},{"group":"out","attrs":{"portLabel":{"text":"Default"}},"id":"2cabe1f8-52f1-4deb-b530-420a484e34ef"}]},"position":{"x":-88,"y":-192},"id":"27ca316a-c6ab-46c9-b788-fc5712eb109f","z":1,"attrs":{"label":{"text":"User action"},"description":{"text":"Transfer funds"},"icon":{"xlinkHref":"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iYmxhY2siIHdpZHRoPSIxOHB4IiBoZWlnaHQ9IjE4cHgiPjxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUiLz48cGF0aCBkPSJNMjEgMy4wMUgzYy0xLjEgMC0yIC45LTIgMlY5aDJWNC45OWgxOHYxNC4wM0gzVjE1SDF2NC4wMWMwIDEuMS45IDEuOTggMiAxLjk4aDE4YzEuMSAwIDItLjg4IDItMS45OHYtMTRjMC0xLjExLS45LTItMi0yek0xMSAxNmw0LTQtNC00djNIMXYyaDEwdjN6Ii8+PC9zdmc+"}}},{"type":"app.Message","size":{"width":368,"height":80},"ports":{"items":[{"group":"in","id":"43f66fe1-4a7e-4e2f-a7b3-76f19191f5e0"},{"group":"out","attrs":{"portLabel":{"text":"Default"}},"id":"203cc295-0a3b-404c-810c-5732c00c404a"}]},"position":{"x":-48,"y":-48},"id":"4f30bb12-5506-4ddc-9193-3b57dc63971c","z":2,"attrs":{"label":{"text":"Entity"},"description":{"text":"From - Account number"},"icon":{"xlinkHref":"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDI0IDI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9ImJsYWNrIiB3aWR0aD0iMThweCIgaGVpZ2h0PSIxOHB4Ij48Zz48cmVjdCBmaWxsPSJub25lIiBoZWlnaHQ9IjI0IiB3aWR0aD0iMjQiLz48L2c+PGc+PGcvPjxnPjxwYXRoIGQ9Ik04LDhINnY3YzAsMS4xLDAuOSwyLDIsMmg5di0ySDhWOHoiLz48cGF0aCBkPSJNMjAsM2gtOGMtMS4xLDAtMiwwLjktMiwydjZjMCwxLjEsMC45LDIsMiwyaDhjMS4xLDAsMi0wLjksMi0yVjVDMjIsMy45LDIxLjEsMywyMCwzeiBNMjAsMTFoLThWN2g4VjExeiIvPjxwYXRoIGQ9Ik00LDEySDJ2N2MwLDEuMSwwLjksMiwyLDJoOXYtMkg0VjEyeiIvPjwvZz48L2c+PGcgZGlzcGxheT0ibm9uZSI+PGcgZGlzcGxheT0iaW5saW5lIi8+PGcgZGlzcGxheT0iaW5saW5lIj48cGF0aCBkPSJNOCw4SDZ2N2MwLDEuMSwwLjksMiwyLDJoOXYtMkg4Vjh6Ii8+PHBhdGggZD0iTTIwLDNoLThjLTEuMSwwLTIsMC45LTIsMnY2YzAsMS4xLDAuOSwyLDIsMmg4YzEuMSwwLDItMC45LDItMlY1QzIyLDMuOSwyMS4xLDMsMjAsM3ogTTIwLDExaC04VjdoOFYxMXoiLz48cGF0aCBkPSJNNCwxMkgydjdjMCwxLjEsMC45LDIsMiwyaDl2LTJINFYxMnoiLz48L2c+PC9nPjwvc3ZnPg=="}}},{"type":"app.Message","size":{"width":368,"height":80},"ports":{"items":[{"group":"in","id":"68819f22-06d7-476b-9b3e-408c47e16845"},{"group":"out","attrs":{"portLabel":{"text":"Default"}},"id":"7e42d4ec-36da-476a-a3c9-83bb3e8a80d3"}]},"position":{"x":-8,"y":96},"id":"990330ee-aeb5-4392-980d-1e15bafbcba9","z":3,"attrs":{"label":{"text":"User action"},"description":{"text":"Get account balance"},"icon":{"xlinkHref":"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iYmxhY2siIHdpZHRoPSIxOHB4IiBoZWlnaHQ9IjE4cHgiPjxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUiLz48cGF0aCBkPSJNMjEgMy4wMUgzYy0xLjEgMC0yIC45LTIgMlY5aDJWNC45OWgxOHYxNC4wM0gzVjE1SDF2NC4wMWMwIDEuMS45IDEuOTggMiAxLjk4aDE4YzEuMSAwIDItLjg4IDItMS45OHYtMTRjMC0xLjExLS45LTItMi0yek0xMSAxNmw0LTQtNC00djNIMXYyaDEwdjN6Ii8+PC9zdmc+"}}},{"type":"app.Link","labels":[{"attrs":{"labelText":{"text":""}},"position":{"distance":0.22035108723975363,"offset":-4,"angle":0}}],"source":{"id":"27ca316a-c6ab-46c9-b788-fc5712eb109f","magnet":"portBody","port":"2cabe1f8-52f1-4deb-b530-420a484e34ef"},"target":{"id":"4f30bb12-5506-4ddc-9193-3b57dc63971c","magnet":"portBody","port":"43f66fe1-4a7e-4e2f-a7b3-76f19191f5e0"},"id":"fd01b965-1f50-4d58-811a-109896ada307","z":4,"attrs":{}},{"type":"app.Message","size":{"width":368,"height":80},"ports":{"items":[{"group":"in","id":"ad64674f-11ea-4d81-b29d-3dadbc7f87f9"},{"group":"out","attrs":{"portLabel":{"text":"Abort"}},"id":"a473f98e-d21b-4a54-b6c2-6d9703c58ff8"},{"group":"out","attrs":{"portLabel":{"text":"Confirm"}},"id":"9fba8354-8cc7-4e48-8b55-b079458811d5"}]},"position":{"x":32,"y":240},"id":"dafeb49c-833b-493e-a708-a243e4daaf16","z":6,"attrs":{"label":{"text":"Confirmation"},"description":{"text":"Balance information"},"icon":{"xlinkHref":"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iYmxhY2siIHdpZHRoPSIxOHB4IiBoZWlnaHQ9IjE4cHgiPjxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUiLz48cGF0aCBkPSJNOSAxNi4yTDQuOCAxMmwtMS40IDEuNEw5IDE5IDIxIDdsLTEuNC0xLjRMOSAxNi4yeiIvPjwvc3ZnPg=="}}},{"type":"app.Link","labels":[{"attrs":{"labelText":{"text":""}},"position":{"distance":0.25}}],"source":{"id":"990330ee-aeb5-4392-980d-1e15bafbcba9","magnet":"portBody","port":"7e42d4ec-36da-476a-a3c9-83bb3e8a80d3"},"target":{"id":"dafeb49c-833b-493e-a708-a243e4daaf16","magnet":"portBody","port":"ad64674f-11ea-4d81-b29d-3dadbc7f87f9"},"id":"c524e89d-722a-4d8d-ab05-9f3e8a47c9a2","z":7,"attrs":{}},{"type":"app.Message","size":{"width":368,"height":80},"ports":{"items":[{"group":"in","id":"48573db2-8c56-4ef9-b44b-33ea089421e1"},{"group":"out","attrs":{"portLabel":{"text":"End"}},"id":"2141ad38-3415-4994-ba63-eb29940b551e"}]},"position":{"x":72,"y":392},"id":"e48dbbbb-0051-4ead-98b1-0e7d05541fb2","z":8,"attrs":{"label":{"text":"Message"},"description":{"text":"Transfer fund aborted"},"icon":{"xlinkHref":"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iYmxhY2siIHdpZHRoPSIxOHB4IiBoZWlnaHQ9IjE4cHgiPjxwYXRoIGQ9Ik0yMCAySDRjLTEuMSAwLTEuOTkuOS0xLjk5IDJMMiAyMmw0LTRoMTRjMS4xIDAgMi0uOSAyLTJWNGMwLTEuMS0uOS0yLTItMnptLTIgMTJINnYtMmgxMnYyem0wLTNINlY5aDEydjJ6bTAtM0g2VjZoMTJ2MnoiLz48cGF0aCBkPSJNMCAwaDI0djI0SDB6IiBmaWxsPSJub25lIi8+PC9zdmc+"}}},{"type":"app.Link","labels":[{"attrs":{"labelText":{"text":""}},"position":{"distance":0.25}}],"source":{"id":"dafeb49c-833b-493e-a708-a243e4daaf16","magnet":"portBody","port":"a473f98e-d21b-4a54-b6c2-6d9703c58ff8"},"target":{"id":"e48dbbbb-0051-4ead-98b1-0e7d05541fb2","magnet":"portBody","port":"48573db2-8c56-4ef9-b44b-33ea089421e1"},"id":"6550af0e-fc25-4da1-841b-5963657c49e7","z":9,"attrs":{}},{"type":"app.Message","size":{"width":368,"height":80},"ports":{"items":[{"group":"in","id":"857eb8fb-0293-47ba-9e3a-5b68e2206b2b"},{"group":"out","attrs":{"portLabel":{"text":"Default"}},"id":"d2f5e221-cf5d-458e-8809-cfca929ef3d8"}]},"position":{"x":448,"y":88},"id":"67f9bcff-8143-4fab-bbf6-065e151f7b0f","z":10,"attrs":{"label":{"text":"Entity"},"description":{"text":"To - Account number"},"icon":{"xlinkHref":"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDI0IDI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9ImJsYWNrIiB3aWR0aD0iMThweCIgaGVpZ2h0PSIxOHB4Ij48Zz48cmVjdCBmaWxsPSJub25lIiBoZWlnaHQ9IjI0IiB3aWR0aD0iMjQiLz48L2c+PGc+PGcvPjxnPjxwYXRoIGQ9Ik04LDhINnY3YzAsMS4xLDAuOSwyLDIsMmg5di0ySDhWOHoiLz48cGF0aCBkPSJNMjAsM2gtOGMtMS4xLDAtMiwwLjktMiwydjZjMCwxLjEsMC45LDIsMiwyaDhjMS4xLDAsMi0wLjksMi0yVjVDMjIsMy45LDIxLjEsMywyMCwzeiBNMjAsMTFoLThWN2g4VjExeiIvPjxwYXRoIGQ9Ik00LDEySDJ2N2MwLDEuMSwwLjksMiwyLDJoOXYtMkg0VjEyeiIvPjwvZz48L2c+PGcgZGlzcGxheT0ibm9uZSI+PGcgZGlzcGxheT0iaW5saW5lIi8+PGcgZGlzcGxheT0iaW5saW5lIj48cGF0aCBkPSJNOCw4SDZ2N2MwLDEuMSwwLjksMiwyLDJoOXYtMkg4Vjh6Ii8+PHBhdGggZD0iTTIwLDNoLThjLTEuMSwwLTIsMC45LTIsMnY2YzAsMS4xLDAuOSwyLDIsMmg4YzEuMSwwLDItMC45LDItMlY1QzIyLDMuOSwyMS4xLDMsMjAsM3ogTTIwLDExaC04VjdoOFYxMXoiLz48cGF0aCBkPSJNNCwxMkgydjdjMCwxLjEsMC45LDIsMiwyaDl2LTJINFYxMnoiLz48L2c+PC9nPjwvc3ZnPg=="}}},{"type":"app.Message","size":{"width":368,"height":80},"ports":{"items":[{"group":"in","id":"95bb2fb8-26c7-41b0-8978-663291855e11"},{"group":"out","attrs":{"portLabel":{"text":"Default"}},"id":"1dae1ddf-42bb-455e-be88-04a0a6354918"}]},"position":{"x":488,"y":240},"id":"01d96073-43da-46a5-a38d-9e34b3c66c00","z":12,"attrs":{"label":{"text":"Entity"},"description":{"text":"Enter the amount to be transferred"},"icon":{"xlinkHref":"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDI0IDI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9ImJsYWNrIiB3aWR0aD0iMThweCIgaGVpZ2h0PSIxOHB4Ij48Zz48cmVjdCBmaWxsPSJub25lIiBoZWlnaHQ9IjI0IiB3aWR0aD0iMjQiLz48L2c+PGc+PGcvPjxnPjxwYXRoIGQ9Ik04LDhINnY3YzAsMS4xLDAuOSwyLDIsMmg5di0ySDhWOHoiLz48cGF0aCBkPSJNMjAsM2gtOGMtMS4xLDAtMiwwLjktMiwydjZjMCwxLjEsMC45LDIsMiwyaDhjMS4xLDAsMi0wLjksMi0yVjVDMjIsMy45LDIxLjEsMywyMCwzeiBNMjAsMTFoLThWN2g4VjExeiIvPjxwYXRoIGQ9Ik00LDEySDJ2N2MwLDEuMSwwLjksMiwyLDJoOXYtMkg0VjEyeiIvPjwvZz48L2c+PGcgZGlzcGxheT0ibm9uZSI+PGcgZGlzcGxheT0iaW5saW5lIi8+PGcgZGlzcGxheT0iaW5saW5lIj48cGF0aCBkPSJNOCw4SDZ2N2MwLDEuMSwwLjksMiwyLDJoOXYtMkg4Vjh6Ii8+PHBhdGggZD0iTTIwLDNoLThjLTEuMSwwLTIsMC45LTIsMnY2YzAsMS4xLDAuOSwyLDIsMmg4YzEuMSwwLDItMC45LDItMlY1QzIyLDMuOSwyMS4xLDMsMjAsM3ogTTIwLDExaC04VjdoOFYxMXoiLz48cGF0aCBkPSJNNCwxMkgydjdjMCwxLjEsMC45LDIsMiwyaDl2LTJINFYxMnoiLz48L2c+PC9nPjwvc3ZnPg=="}}},{"type":"app.Link","labels":[{"attrs":{"labelText":{"text":""}},"position":{"distance":0.25}}],"source":{"id":"67f9bcff-8143-4fab-bbf6-065e151f7b0f","magnet":"portBody","port":"d2f5e221-cf5d-458e-8809-cfca929ef3d8"},"target":{"id":"01d96073-43da-46a5-a38d-9e34b3c66c00","magnet":"portBody","port":"95bb2fb8-26c7-41b0-8978-663291855e11"},"id":"32cf8dd3-831e-4317-9a10-619f3d59171b","z":13,"attrs":{}},{"type":"app.Message","size":{"width":368,"height":80},"ports":{"items":[{"group":"in","id":"066dcab9-cfa2-4b94-a8bf-5b9dba1ddf94"},{"group":"out","attrs":{"portLabel":{"text":"End"}},"id":"d487d13f-4651-403a-90b8-dbcae875607e"}]},"position":{"x":528,"y":384},"id":"cf4a5fe1-b41f-44ae-a8b2-050ba69c7d39","z":14,"attrs":{"label":{"text":"Message"},"description":{"text":"Amount has been transferred"},"icon":{"xlinkHref":"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iYmxhY2siIHdpZHRoPSIxOHB4IiBoZWlnaHQ9IjE4cHgiPjxwYXRoIGQ9Ik0yMCAySDRjLTEuMSAwLTEuOTkuOS0xLjk5IDJMMiAyMmw0LTRoMTRjMS4xIDAgMi0uOSAyLTJWNGMwLTEuMS0uOS0yLTItMnptLTIgMTJINnYtMmgxMnYyem0wLTNINlY5aDEydjJ6bTAtM0g2VjZoMTJ2MnoiLz48cGF0aCBkPSJNMCAwaDI0djI0SDB6IiBmaWxsPSJub25lIi8+PC9zdmc+"}}},{"type":"app.Link","labels":[{"attrs":{"labelText":{"text":""}},"position":{"distance":0.25}}],"source":{"id":"01d96073-43da-46a5-a38d-9e34b3c66c00","magnet":"portBody","port":"1dae1ddf-42bb-455e-be88-04a0a6354918"},"target":{"id":"cf4a5fe1-b41f-44ae-a8b2-050ba69c7d39","magnet":"portBody","port":"066dcab9-cfa2-4b94-a8bf-5b9dba1ddf94"},"id":"d12f50b9-313c-4567-b008-573da6831110","z":15,"vertices":[],"attrs":{}},{"type":"app.Link","labels":[{"attrs":{"labelText":{"text":""}},"position":{"distance":0.25}}],"source":{"id":"4f30bb12-5506-4ddc-9193-3b57dc63971c","magnet":"portBody","port":"203cc295-0a3b-404c-810c-5732c00c404a"},"target":{"id":"990330ee-aeb5-4392-980d-1e15bafbcba9","magnet":"portBody","port":"68819f22-06d7-476b-9b3e-408c47e16845"},"id":"402d022f-88ba-48ab-8caa-66de54a91cc5","z":16,"attrs":{}},{"type":"app.Link","labels":[{"attrs":{"labelText":{"text":""}},"position":{"distance":0.25}}],"source":{"id":"dafeb49c-833b-493e-a708-a243e4daaf16","magnet":"portBody","port":"9fba8354-8cc7-4e48-8b55-b079458811d5"},"target":{"id":"67f9bcff-8143-4fab-bbf6-065e151f7b0f","magnet":"portBody","port":"857eb8fb-0293-47ba-9e3a-5b68e2206b2b"},"id":"4d9c06a9-d89d-4b5a-b79a-6b6b92e8672f","z":17,"vertices":[],"attrs":{}},{"type":"app.FlowchartStart","size":{"width":48,"height":48},"ports":{"items":[{"group":"out","id":"4eb6a098-7345-4e6d-b15f-7a8069339170"}]},"position":{"x":-88,"y":-296},"id":"15b1e67d-2d13-4c26-9061-059218126f6c","z":18,"attrs":{"label":{"text":"Start"}}},{"type":"app.Link","labels":[{"attrs":{"labelText":{"text":""}},"position":{"distance":0.25}}],"source":{"id":"15b1e67d-2d13-4c26-9061-059218126f6c","magnet":"portBody","port":"4eb6a098-7345-4e6d-b15f-7a8069339170"},"target":{"id":"27ca316a-c6ab-46c9-b788-fc5712eb109f","magnet":"portBody","port":"6f7dad69-eb1d-49c7-a4b6-3790495afe93"},"id":"55175fd3-f3b7-4c5a-ad84-faab4fc6138e","z":19,"attrs":{}},{"type":"app.FlowchartEnd","size":{"width":48,"height":48},"ports":{"items":[{"group":"in","id":"a05eeff4-344c-4f83-9bc9-4bfa156e20ba"}]},"position":{"x":336,"y":552},"id":"8b1eff36-0d08-4326-9c06-3197387286a5","z":20,"attrs":{"label":{"text":"End"}}},{"type":"app.Link","labels":[{"attrs":{"labelText":{"text":"Aborted"}},"position":{"distance":0.30207471194317553,"offset":-16,"angle":0}}],"source":{"id":"e48dbbbb-0051-4ead-98b1-0e7d05541fb2","magnet":"portBody","port":"2141ad38-3415-4994-ba63-eb29940b551e"},"target":{"id":"8b1eff36-0d08-4326-9c06-3197387286a5","magnet":"portBody","port":"a05eeff4-344c-4f83-9bc9-4bfa156e20ba"},"id":"afd7992f-aaf9-4ae0-8847-93d91d34c6f6","z":21,"attrs":{}},{"type":"app.Link","labels":[{"attrs":{"labelText":{"text":"Confirmed"}},"position":{"distance":0.3396172434541929,"offset":16,"angle":0}}],"source":{"id":"cf4a5fe1-b41f-44ae-a8b2-050ba69c7d39","magnet":"portBody","port":"d487d13f-4651-403a-90b8-dbcae875607e"},"target":{"id":"8b1eff36-0d08-4326-9c06-3197387286a5","magnet":"portBody","port":"a05eeff4-344c-4f83-9bc9-4bfa156e20ba"},"id":"f0f29396-3d9a-4773-ab86-b649f0f0ae57","z":22,"vertices":[],"attrs":{}}]}'
		// )
		e.exports = {
			"cells": [{
				"type": "app.Message",
				"size": {
					"width": 368,
					"height": 80
				},
				"ports": {
					"items": [{
						"group": "in",
						"id": "a5828746-00f6-47cb-a112-fda88b323069"
					}, {
						"group": "out",
						"attrs": {
							"portLabel": {
								"text": "Approval"
							}
						},
						"id": "db30a162-9a97-40e2-9405-c7485f2c9b82"
					}]
				},
				"position": {
					"x": -360,
					"y": -408
				},
				"id": "ce6ff2fe-d3b5-40d8-bdb1-ac255e314844",
				"z": 2,
				"attrs": {
					"body": {
						"stroke": "#E8E8E8"
					},
					"label": {
						"text": "Assign PM"
					},
					"description": {
						"text": "RM admin task to assign PM"
					},
					"icon": {
						"xlinkHref": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iYmxhY2siIHdpZHRoPSIxOHB4IiBoZWlnaHQ9IjE4cHgiPjxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUiLz48cGF0aCBkPSJNMjEgMy4wMUgzYy0xLjEgMC0yIC45LTIgMlY5aDJWNC45OWgxOHYxNC4wM0gzVjE1SDF2NC4wMWMwIDEuMS45IDEuOTggMiAxLjk4aDE4YzEuMSAwIDItLjg4IDItMS45OHYtMTRjMC0xLjExLS45LTItMi0yek0xMSAxNmw0LTQtNC00djNIMXYyaDEwdjN6Ii8+PC9zdmc+"
					}
				}
			}, {
				"type": "app.Message",
				"size": {
					"width": 368,
					"height": 80
				},
				"ports": {
					"items": [{
						"group": "in",
						"id": "1d329dd1-0df9-40a5-b811-bc5107766dc2"
					}, {
						"group": "out",
						"attrs": {
							"portLabel": {
								"text": "Approval"
							}
						},
						"id": "f1050ff9-a3e0-4f6f-965f-6aacdc4ec053"
					}]
				},
				"position": {
					"x": -112,
					"y": -272
				},
				"id": "cdcdaccc-b316-4c99-b67d-e8557e996932",
				"z": 3,
				"attrs": {
					"body": {
						"stroke": "#E8E8E8"
					},
					"label": {
						"text": "Create RLS Demand"
					},
					"description": {
						"text": "PM task to create RLS Demand"
					},
					"icon": {
						"xlinkHref": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iYmxhY2siIHdpZHRoPSIxOHB4IiBoZWlnaHQ9IjE4cHgiPjxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUiLz48cGF0aCBkPSJNMjEgMy4wMUgzYy0xLjEgMC0yIC45LTIgMlY5aDJWNC45OWgxOHYxNC4wM0gzVjE1SDF2NC4wMWMwIDEuMS45IDEuOTggMiAxLjk4aDE4YzEuMSAwIDItLjg4IDItMS45OHYtMTRjMC0xLjExLS45LTItMi0yek0xMSAxNmw0LTQtNC00djNIMXYyaDEwdjN6Ii8+PC9zdmc+"
					}
				}
			}, {
				"type": "app.Message",
				"size": {
					"width": 368,
					"height": 80
				},
				"ports": {
					"items": [{
						"group": "in",
						"id": "eebfa15e-1759-47a5-93bb-13bdeb3ce75d"
					}, {
						"group": "out",
						"attrs": {
							"portLabel": {
								"text": "Approval"
							}
						},
						"id": "4cf9ecfd-1bf5-461b-b20e-252f19db20cf"
					}, {
						"group": "out",
						"attrs": {
							"portLabel": {
								"text": "Rejection"
							}
						},
						"id": "4da21bc2-6f66-4f37-943b-9722188f6ef9"
					}]
				},
				"position": {
					"x": -376,
					"y": -96
				},
				"id": "cc6c2448-2f18-4e0b-aa5b-3ab721d4ecca",
				"z": 4,
				"attrs": {
					"body": {
						"stroke": "#E8E8E8"
					},
					"label": {
						"text": "Allocate Resources"
					},
					"description": {
						"text": "RM admin task to allocate resources"
					},
					"icon": {
						"xlinkHref": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iYmxhY2siIHdpZHRoPSIxOHB4IiBoZWlnaHQ9IjE4cHgiPjxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUiLz48cGF0aCBkPSJNMjEgMy4wMUgzYy0xLjEgMC0yIC45LTIgMlY5aDJWNC45OWgxOHYxNC4wM0gzVjE1SDF2NC4wMWMwIDEuMS45IDEuOTggMiAxLjk4aDE4YzEuMSAwIDItLjg4IDItMS45OHYtMTRjMC0xLjExLS45LTItMi0yek0xMSAxNmw0LTQtNC00djNIMXYyaDEwdjN6Ii8+PC9zdmc+"
					}
				}
			}, {
				"type": "app.Message",
				"size": {
					"width": 368,
					"height": 80
				},
				"ports": {
					"items": [{
						"group": "in",
						"id": "e43f4f34-1acd-4d37-9368-178a2e043571"
					}, {
						"group": "out",
						"attrs": {
							"portLabel": {
								"text": "Approval"
							}
						},
						"id": "2ba9568b-6eb0-42db-8168-dfb9a683f863"
					}]
				},
				"position": {
					"x": -136,
					"y": 96
				},
				"id": "b3bf8799-72fd-4096-af56-0d87e00c9af8",
				"z": 5,
				"attrs": {
					"body": {
						"stroke": "#E8E8E8"
					},
					"label": {
						"text": "Exceptions Case"
					},
					"description": {
						"text": "Exceptional Cases Rule"
					},
					"icon": {
						"xlinkHref": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iYmxhY2siIHdpZHRoPSIxOHB4IiBoZWlnaHQ9IjE4cHgiPjxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUiLz48cGF0aCBkPSJNMjEgMy4wMUgzYy0xLjEgMC0yIC45LTIgMlY5aDJWNC45OWgxOHYxNC4wM0gzVjE1SDF2NC4wMWMwIDEuMS45IDEuOTggMiAxLjk4aDE4YzEuMSAwIDItLjg4IDItMS45OHYtMTRjMC0xLjExLS45LTItMi0yek0xMSAxNmw0LTQtNC00djNIMXYyaDEwdjN6Ii8+PC9zdmc+"
					}
				}
			}, {
				"type": "app.Message",
				"size": {
					"width": 368,
					"height": 80
				},
				"ports": {
					"items": [{
						"group": "in",
						"id": "73ec7218-6d05-49f6-846e-a138747dc95c"
					}, {
						"group": "out",
						"attrs": {
							"portLabel": {
								"text": "Approval"
							}
						},
						"id": "9a9fc958-f3dd-4505-b19f-d84e1873f497"
					}]
				},
				"position": {
					"x": -112,
					"y": 272
				},
				"id": "11aacf39-e446-472c-a83f-c9506b02e75a",
				"z": 6,
				"attrs": {
					"body": {
						"stroke": "#E8E8E8"
					},
					"label": {
						"text": "CEO Approval"
					},
					"description": {
						"text": "CEO Approval (Exceptional Case)"
					},
					"icon": {
						"xlinkHref": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iYmxhY2siIHdpZHRoPSIxOHB4IiBoZWlnaHQ9IjE4cHgiPjxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUiLz48cGF0aCBkPSJNMjEgMy4wMUgzYy0xLjEgMC0yIC45LTIgMlY5aDJWNC45OWgxOHYxNC4wM0gzVjE1SDF2NC4wMWMwIDEuMS45IDEuOTggMiAxLjk4aDE4YzEuMSAwIDItLjg4IDItMS45OHYtMTRjMC0xLjExLS45LTItMi0yek0xMSAxNmw0LTQtNC00djNIMXYyaDEwdjN6Ii8+PC9zdmc+"
					}
				}
			}, {
				"type": "app.FlowchartEnd",
				"size": {
					"width": 48,
					"height": 48
				},
				"ports": {
					"items": [{
						"group": "in",
						"id": "e4ac8d14-d8fa-49ee-a73f-80064f7a0b0e"
					}]
				},
				"position": {
					"x": -168,
					"y": 424
				},
				"id": "a5e55d4f-8bba-4269-9806-078f41225733",
				"z": 7,
				"attrs": {
					"label": {
						"text": "End"
					}
				}
			}, {
				"type": "app.FlowchartStart",
				"size": {
					"width": 48,
					"height": 48
				},
				"ports": {
					"items": [{
						"group": "out",
						"id": "23ec29fe-4e4d-4c55-b480-45395806840f"
					}]
				},
				"position": {
					"x": -360,
					"y": -560
				},
				"id": "e78bdedb-6bfc-491f-bed7-227e4417bfed",
				"z": 8,
				"attrs": {
					"label": {
						"text": "Start"
					}
				}
			}, {
				"type": "app.Link",
				"labels": [{
					"attrs": {
						"labelText": {
							"text": "L2"
						}
					},
					"position": {
						"distance": 0.4324229911294878,
						"offset": 0,
						"angle": 0
					}
				}],
				"source": {
					"id": "ce6ff2fe-d3b5-40d8-bdb1-ac255e314844",
					"magnet": "portBody",
					"port": "db30a162-9a97-40e2-9405-c7485f2c9b82"
				},
				"target": {
					"id": "cdcdaccc-b316-4c99-b67d-e8557e996932",
					"magnet": "portBody",
					"port": "1d329dd1-0df9-40a5-b811-bc5107766dc2"
				},
				"id": "f2f8ebc2-9faa-4f7d-b3ba-bb2b1a843cf6",
				"z": 9,
				"attrs": {}
			}, {
				"type": "app.Link",
				"labels": [{
					"attrs": {
						"labelText": {
							"text": "Trigger Rule L1"
						}
					},
					"position": {
						"distance": 0.25
					}
				}],
				"source": {
					"id": "e78bdedb-6bfc-491f-bed7-227e4417bfed",
					"magnet": "portBody",
					"port": "23ec29fe-4e4d-4c55-b480-45395806840f"
				},
				"target": {
					"id": "ce6ff2fe-d3b5-40d8-bdb1-ac255e314844",
					"magnet": "portBody",
					"port": "a5828746-00f6-47cb-a112-fda88b323069"
				},
				"id": "05e43e0c-b0d0-44bf-b7c7-6364da0a4326",
				"z": 10,
				"attrs": {}
			}, {
				"type": "app.Link",
				"labels": [{
					"attrs": {
						"labelText": {
							"text": "L3"
						}
					},
					"position": {
						"distance": 0.4801412969290847,
						"offset": 0,
						"angle": 0
					}
				}],
				"source": {
					"id": "cdcdaccc-b316-4c99-b67d-e8557e996932",
					"magnet": "portBody",
					"port": "f1050ff9-a3e0-4f6f-965f-6aacdc4ec053"
				},
				"target": {
					"id": "cc6c2448-2f18-4e0b-aa5b-3ab721d4ecca",
					"magnet": "portBody",
					"port": "eebfa15e-1759-47a5-93bb-13bdeb3ce75d"
				},
				"id": "c7e5cebc-3022-496a-b723-f46db050315d",
				"z": 11,
				"attrs": {}
			}, {
				"type": "app.Link",
				"labels": [{
					"attrs": {
						"labelText": {
							"text": "L5"
						}
					},
					"position": {
						"distance": 0.25
					}
				}],
				"source": {
					"id": "cc6c2448-2f18-4e0b-aa5b-3ab721d4ecca",
					"magnet": "portBody",
					"port": "4cf9ecfd-1bf5-461b-b20e-252f19db20cf"
				},
				"target": {
					"id": "a5e55d4f-8bba-4269-9806-078f41225733",
					"magnet": "portBody",
					"port": "e4ac8d14-d8fa-49ee-a73f-80064f7a0b0e"
				},
				"id": "635b661e-ce46-4b42-a38e-20f653e52c89",
				"z": 12,
				"attrs": {}
			}, {
				"type": "app.Link",
				"labels": [{
					"attrs": {
						"labelText": {
							"text": "L4"
						}
					},
					"position": {
						"distance": 0.25
					}
				}],
				"source": {
					"id": "cc6c2448-2f18-4e0b-aa5b-3ab721d4ecca",
					"magnet": "portBody",
					"port": "4da21bc2-6f66-4f37-943b-9722188f6ef9"
				},
				"target": {
					"id": "b3bf8799-72fd-4096-af56-0d87e00c9af8",
					"magnet": "portBody",
					"port": "e43f4f34-1acd-4d37-9368-178a2e043571"
				},
				"id": "11d3e06b-77b4-4ea1-b8b4-d5e3a973bde1",
				"z": 13,
				"attrs": {}
			}, {
				"type": "app.Link",
				"labels": [{
					"attrs": {
						"labelText": {
							"text": "L5"
						}
					},
					"position": {
						"distance": 0.25
					}
				}],
				"source": {
					"id": "b3bf8799-72fd-4096-af56-0d87e00c9af8",
					"magnet": "portBody",
					"port": "2ba9568b-6eb0-42db-8168-dfb9a683f863"
				},
				"target": {
					"id": "11aacf39-e446-472c-a83f-c9506b02e75a",
					"magnet": "portBody",
					"port": "73ec7218-6d05-49f6-846e-a138747dc95c"
				},
				"id": "29e266c5-8234-4d44-b11f-f2b6996824a0",
				"z": 14,
				"attrs": {}
			}, {
				"type": "app.Link",
				"labels": [{
					"attrs": {
						"labelText": {
							"text": "Label"
						}
					},
					"position": {
						"distance": 0.25
					}
				}],
				"source": {
					"id": "11aacf39-e446-472c-a83f-c9506b02e75a",
					"magnet": "portBody",
					"port": "9a9fc958-f3dd-4505-b19f-d84e1873f497"
				},
				"target": {
					"id": "a5e55d4f-8bba-4269-9806-078f41225733",
					"magnet": "portBody",
					"port": "e4ac8d14-d8fa-49ee-a73f-80064f7a0b0e"
				},
				"id": "4e9fb436-45e9-4084-b10a-481387fe37ef",
				"z": 15,
				"attrs": {}
			}]
		}
	},
	2622: function (e, t, a) {},
	3812: function (e, t, a) {},
	"4f74": function (e, t, a) {
		"use strict";
		var o = a("2622"),
			i = a.n(o);
		i.a
	},
	"5c0b": function (e, t, a) {
		"use strict";
		var o = a("9c0c"),
			i = a.n(o);
		i.a
	},
	"9c0c": function (e, t, a) {},
	b780: function (e, t, a) {
		"use strict";
		var o = a("3812"),
			i = a.n(o);
		i.a
	},
	cd49: function (e, t, a) {
		"use strict";
		a.r(t);
		a("e260"), a("e6cf"), a("cca6"), a("a79d");
		var o, i = a("2b0e"),
			n = function () {
				var e = this,
					t = e.$createElement,
					a = e._self._c || t;
				return a("div", {
					staticClass: "rappid-app"
				}, [a("div", {
					staticClass: "app-body"
				}, [a("div", {
					ref: "toolbar"
				}), a("div", {
					staticClass: "side-bar"
				}, [a("div", {
					staticClass: "toggle-bar"
				}, [a("div", {
					staticClass: "icon toggle-stencil",
					class: {
						"disabled-icon": !e.stencilOpened
					},
					attrs: {
						"data-tooltip": "Toggle Element Palette",
						"data-tooltip-position-selector": ".toggle-bar"
					},
					on: {
						click: function (t) {
							return e.toggleStencil();
						}
					}
				}), a("div", {
					staticClass: "icon toggle-editor",
					class: {
						"disabled-icon": !e.jsonEditorOpened
					},
					attrs: {
						"data-tooltip": "Toggle JSON Editor",
						"data-tooltip-position-selector": ".toggle-bar"
					},
					on: {
						click: function (t) {
							return e.toggleJsonEditor()
						}
					}
				})]), a("div", {
					directives: [{
						name: "show",
						rawName: "v-show",
						value: e.stencilOpened,
						expression: "stencilOpened"
					}],
					ref: "stencil",
					staticClass: "stencil-container"
				})]), a("div", {
					staticClass: "main-container"
				}, [a("div", {
					ref: "paper",
					staticClass: "paper-container"
				}), a("JsonEditor", {
					directives: [{
						name: "show",
						rawName: "v-show",
						value: e.jsonEditorOpened,
						expression: "jsonEditorOpened"
					}],
					attrs: {
						content: e.fileJSON
					}
				})], 1), a("Inspector")], 1)])
			},
			r = [],
			s = a("d4ec"),
			l = a("bee2"),
			c = a("262e"),
			d = a("2caf"),
			p = a("9ab4"),
			u = a("2fe1"),
			b = (a("4160"), a("b0c0"), a("b64b"), a("159b"), a("ab5c")),
			f = a("a6e8"),
			g = a("1f2c"),
			m = 3,
			h = "realist, Helvetica, Arial, sans-serif",
			M = 28,
			v = 96,
			y = "out",
			L = 16,
			x = 8,
			I = x,
			w = 2 * x,
			j = 20,
			C = 16,
			S = "#F9F9F9",
			D = "#FCFCFC",
			O = "#FFFFFF",
			k = "#212121",
			T = "#0057FF",
			N = 2,
			P = 200,
			A = 3,
			E = .4,
			z = .2,
			B =
			"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iYmxhY2siIHdpZHRoPSIxOHB4IiBoZWlnaHQ9IjE4cHgiPjxwYXRoIGQ9Ik0yMCAySDRjLTEuMSAwLTEuOTkuOS0xLjk5IDJMMiAyMmw0LTRoMTRjMS4xIDAgMi0uOSAyLTJWNGMwLTEuMS0uOS0yLTItMnptLTIgMTJINnYtMmgxMnYyem0wLTNINlY5aDEydjJ6bTAtM0g2VjZoMTJ2MnoiLz48cGF0aCBkPSJNMCAwaDI0djI0SDB6IiBmaWxsPSJub25lIi8+PC9zdmc+",
			H =
			"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iYmxhY2siIHdpZHRoPSIxOHB4IiBoZWlnaHQ9IjE4cHgiPjxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUiLz48cGF0aCBkPSJNMjEgMy4wMUgzYy0xLjEgMC0yIC45LTIgMlY5aDJWNC45OWgxOHYxNC4wM0gzVjE1SDF2NC4wMWMwIDEuMS45IDEuOTggMiAxLjk4aDE4YzEuMSAwIDItLjg4IDItMS45OHYtMTRjMC0xLjExLS45LTItMi0yek0xMSAxNmw0LTQtNC00djNIMXYyaDEwdjN6Ii8+PC9zdmc+",
			G =
			"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iYmxhY2siIHdpZHRoPSIxOHB4IiBoZWlnaHQ9IjE4cHgiPjxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUiLz48cGF0aCBkPSJNOSAxNi4yTDQuOCAxMmwtMS40IDEuNEw5IDE5IDIxIDdsLTEuNC0xLjRMOSAxNi4yeiIvPjwvc3ZnPg==",
			Z =
			"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDI0IDI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9ImJsYWNrIiB3aWR0aD0iMThweCIgaGVpZ2h0PSIxOHB4Ij48Zz48cmVjdCBmaWxsPSJub25lIiBoZWlnaHQ9IjI0IiB3aWR0aD0iMjQiLz48L2c+PGc+PGcvPjxnPjxwYXRoIGQ9Ik04LDhINnY3YzAsMS4xLDAuOSwyLDIsMmg5di0ySDhWOHoiLz48cGF0aCBkPSJNMjAsM2gtOGMtMS4xLDAtMiwwLjktMiwydjZjMCwxLjEsMC45LDIsMiwyaDhjMS4xLDAsMi0wLjksMi0yVjVDMjIsMy45LDIxLjEsMywyMCwzeiBNMjAsMTFoLThWN2g4VjExeiIvPjxwYXRoIGQ9Ik00LDEySDJ2N2MwLDEuMSwwLjksMiwyLDJoOXYtMkg0VjEyeiIvPjwvZz48L2c+PGcgZGlzcGxheT0ibm9uZSI+PGcgZGlzcGxheT0iaW5saW5lIi8+PGcgZGlzcGxheT0iaW5saW5lIj48cGF0aCBkPSJNOCw4SDZ2N2MwLDEuMSwwLjksMiwyLDJoOXYtMkg4Vjh6Ii8+PHBhdGggZD0iTTIwLDNoLThjLTEuMSwwLTIsMC45LTIsMnY2YzAsMS4xLDAuOSwyLDIsMmg4YzEuMSwwLDItMC45LDItMlY1QzIyLDMuOSwyMS4xLDMsMjAsM3ogTTIwLDExaC04VjdoOFYxMXoiLz48cGF0aCBkPSJNNCwxMkgydjdjMCwxLjEsMC45LDIsMiwyaDl2LTJINFYxMnoiLz48L2c+PC9nPjwvc3ZnPg==",
			F = {
				tools: [{
					type: "undo",
					name: "undo",
					group: "undo-redo",
					attrs: {
						button: {
							"data-tooltip": "Undo <i>(Ctrl+Z)</i>",
							"data-tooltip-position": "top"
						}
					}
				}, {
					type: "redo",
					name: "redo",
					group: "undo-redo",
					attrs: {
						button: {
							"data-tooltip": "Redo <i>(Ctrl+Y)</i>",
							"data-tooltip-position": "top"
						}
					}
				}, {
					type: "zoom-in",
					name: "zoom-in",
					group: "zoom",
					max: A,
					step: z,
					attrs: {
						button: {
							"data-tooltip": "Zoom In <i>(Ctrl+Plus)</i>",
							"data-tooltip-position": "top"
						}
					}
				}, {
					type: "zoom-out",
					name: "zoom-out",
					group: "zoom",
					min: E,
					step: z,
					attrs: {
						button: {
							"data-tooltip": "Zoom Out <i>(Ctrl+Minus)</i>",
							"data-tooltip-position": "top"
						}
					}
				}, {
					type: "zoom-to-fit",
					name: "zoom-to-fit",
					group: "zoom",
					max: A,
					min: E,
					step: z,
					attrs: {
						button: {
							"data-tooltip": "Fit Diagram <i>(Ctrl+0)</i>",
							"data-tooltip-position": "top"
						}
					}
				}, {
					type: "button",
					name: "png",
					group: "export",
					text: "Export PNG",
					attrs: {
						button: {
							id: "btn-png",
							"data-tooltip": "Export as PNG <i>(Ctrl+E)</i>",
							"data-tooltip-position": "top"
						}
					}
				}]
			};
		a("d81d"), a("f4b3"), a("bf19");
		(function (e) {
			e["BASE"] = "app.Base", e["MESSAGE"] = "app.Message", e["FLOWCHART_START"] = "app.FlowchartStart", e["FLOWCHART_END"] =
				"app.FlowchartEnd", e["LINK"] = "app.Link"
		})(o || (o = {}));
		var W, Y = function (e, t) {
				var a = v + I;
				return e.map((function (e, o) {
					return new g["g"].Point({
						x: w + v / 2 + o * a,
						y: t.height
					})
				}))
			},
			R = g["dia"].Element.define(o.BASE, {}, {
				getBoundaryPadding: function () {
					return g["util"].normalizeSides(this.boundaryPadding)
				},
				toJSON: function () {
					var e = g["dia"].Element.prototype.toJSON.call(this);
					return delete e.ports.groups, delete e.angle, e
				}
			}, {
				fromStencilShape: function (e) {
					var t = {
						label: {
							text: e.attr(["label", "text"])
						},
						body: {
							stroke: e.attr(["body", "stroke"]),
							fill: e.attr(["body", "fill"])
						},
						icon: {
							xlinkHref: e.attr(["icon", "xlinkHref"])
						}
					};
					return new this({
						attrs: t
					})
				}
			}),
			J = R.define(o.MESSAGE, {
				size: {
					width: 368,
					height: 80
				},
				ports: {
					groups: { in : {
							position: {
								name: "manual",
								args: {
									x: w,
									y: 0
								}
							},
							size: {
								width: 16,
								height: 16
							},
							attrs: {
								portBody: {
									magnet: "passive",
									refWidth: "100%",
									refHeight: "100%",
									refY: "-50%",
									rx: L,
									ry: L,
									fill: O,
									stroke: k,
									strokeWidth: N
								}
							},
							markup: [{
								tagName: "rect",
								selector: "portBody"
							}]
						},
						out: {
							position: Y,
							size: {
								width: v,
								height: M
							},
							attrs: {
								portBody: {
									magnet: "active",
									refWidth: "100%",
									refHeight: "100%",
									refX: "-50%",
									refY: "-50%",
									fill: k,
									ry: L,
									rx: L
								},
								portLabel: {
									pointerEvents: "none",
									fontFamily: h,
									fontWeight: 400,
									fontSize: 13,
									fill: O,
									textAnchor: "start",
									textVerticalAnchor: "middle",
									textWrap: {
										width: -C - w - I,
										maxLineCount: 1,
										ellipsis: !0
									},
									x: w - v / 2
								},
								portRemoveButton: {
									cursor: "pointer",
									event: "element:port:remove",
									refX: "-50%",
									refDx: -w,
									dataTooltip: "Remove Output Port",
									dataTooltipPosition: "top"
								},
								portRemoveButtonBody: {
									width: C,
									height: C,
									x: -C / 2,
									y: -C / 2,
									fill: O,
									rx: L,
									ry: L
								},
								portRemoveButtonIcon: {
									d: "M -4 -4 4 4 M -4 4 4 -4",
									stroke: k,
									strokeWidth: N
								}
							},
							markup: [{
								tagName: "rect",
								selector: "portBody"
							}, {
								tagName: "text",
								selector: "portLabel"
							}, {
								tagName: "g",
								selector: "portRemoveButton",
								children: [{
									tagName: "rect",
									selector: "portRemoveButtonBody"
								}, {
									tagName: "path",
									selector: "portRemoveButtonIcon"
								}]
							}]
						}
					},
					items: [{
						group: "in"
					}, {
						group: "out",
						attrs: {
							portLabel: {
								text: y
							}
						}
					}]
				},
				attrs: {
					body: {
						refWidth: "100%",
						refHeight: "100%",
						fill: O,
						strokeWidth: N / 2,
						stroke: "#D4D4D4",
						rx: 3,
						ry: 3
					},
					label: {
						refX: 54,
						refY: w,
						fontFamily: h,
						fontWeight: 600,
						fontSize: 16,
						fill: "#322A49",
						text: "Label",
						textWrap: {
							width: -54 - w,
							maxLineCount: 1,
							ellipsis: !0
						},
						textVerticalAnchor: "top"
					},
					description: {
						refX: 54,
						refY: 38,
						fontFamily: h,
						fontWeight: 400,
						fontSize: 13,
						lineHeight: 13,
						fill: "#655E77",
						textVerticalAnchor: "top",
						text: "Description",
						textWrap: {
							width: -54 - w,
							maxLineCount: 2,
							ellipsis: !0
						}
					},
					icon: {
						width: 20,
						height: 20,
						refX: w,
						refY: 24,
						xlinkHref: "https://image.flaticon.com/icons/svg/151/151795.svg"
					},
					portAddButton: {
						cursor: "pointer",
						fill: T,
						event: "element:port:add",
						refX: "100%",
						refX2: -28,
						refY: "100%",
						dataTooltip: "Add Output Port",
						dataTooltipPosition: "top"
					},
					portAddButtonBody: {
						width: j,
						height: j,
						rx: L,
						ry: L,
						x: -j / 2,
						y: -j / 2
					},
					portAddButtonIcon: {
						d: "M -4 0 4 0 M 0 -4 0 4",
						stroke: "#FFFFFF",
						strokeWidth: N
					}
				}
			}, {
				markup: [{
					tagName: "rect",
					selector: "body"
				}, {
					tagName: "text",
					selector: "label"
				}, {
					tagName: "text",
					selector: "description"
				}, {
					tagName: "image",
					selector: "icon"
				}, {
					tagName: "g",
					selector: "portAddButton",
					children: [{
						tagName: "rect",
						selector: "portAddButtonBody"
					}, {
						tagName: "path",
						selector: "portAddButtonIcon"
					}]
				}],
				boundaryPadding: {
					horizontal: w,
					top: w,
					bottom: M / 2 + w
				},
				addDefaultPort: function () {
					this.canAddPort("out") && this.addPort({
						group: "out",
						attrs: {
							portLabel: {
								text: y
							}
						}
					})
				},
				canAddPort: function (e) {
					return Object.keys(this.getGroupPorts(e)).length < m
				},
				toggleAddPortButton: function (e) {
					var t = this.canAddPort(e) ? {
						fill: T,
						cursor: "pointer"
					} : {
						fill: "#BEBEBE",
						cursor: "not-allowed"
					};
					this.attr(["portAddButton"], t, {
						dry: !0
					})
				}
			}),
			_ = R.define(o.FLOWCHART_START, {
				size: {
					width: 48,
					height: 48
				},
				ports: {
					groups: {
						out: {
							position: {
								name: "bottom"
							},
							attrs: {
								portBody: {
									fill: k,
									stroke: S,
									strokeWidth: 6,
									paintOrder: "stroke",
									magnet: "active",
									refR: "50%"
								}
							},
							size: {
								width: 10,
								height: 10
							},
							markup: [{
								tagName: "circle",
								selector: "portBody"
							}]
						}
					},
					items: [{
						group: "out"
					}]
				},
				attrs: {
					body: {
						fill: T,
						stroke: "none",
						refCx: "50%",
						refCy: "50%",
						r: 24
					},
					icon: {
						d: "M 2 8 L 4.29 5.71 L 1.41 2.83 L 2.83 1.41 L 5.71 4.29 L 8 2 L 8 8 Z M -2 8 L -8 8 L -8 2 L -5.71 4.29 L -1 -0.41 L -1 -8 L 1 -8 L 1 0.41 L -4.29 5.71 Z",
						fill: O,
						refX: "50%",
						refY: "50%"
					},
					label: {
						text: "Flowchart start",
						textWrap: {
							width: 200,
							height: 100,
							ellipsis: !0
						},
						refX: "50%",
						refY: -w,
						textAnchor: "middle",
						textVerticalAnchor: "bottom",
						fill: "#55627B",
						fontFamily: h,
						fontSize: 13
					}
				}
			}, {
				markup: [{
					tagName: "circle",
					selector: "body"
				}, {
					tagName: "path",
					selector: "icon"
				}, {
					tagName: "text",
					selector: "label"
				}],
				boundaryPadding: {
					horizontal: w,
					top: I,
					bottom: w
				}
			}),
			V = R.define(o.FLOWCHART_END, {
				size: {
					width: 48,
					height: 48
				},
				ports: {
					groups: { in : {
							position: {
								name: "top"
							},
							attrs: {
								portBody: {
									fill: k,
									stroke: S,
									strokeWidth: 6,
									paintOrder: "stroke",
									magnet: "passive",
									refR: "50%"
								}
							},
							size: {
								width: 10,
								height: 10
							},
							markup: [{
								tagName: "circle",
								selector: "portBody"
							}]
						}
					},
					items: [{
						group: "in"
					}]
				},
				attrs: {
					body: {
						fill: T,
						stroke: "none",
						refCx: "50%",
						refCy: "50%",
						r: 24
					},
					icon: {
						d: "M 5 -8.45 L 6.41 -7.04 L 3 -3.635 L 1.59 -5.04 Z M -4.5 3.95 L -1 3.95 L -1 -1.63 L -6.41 -7.04 L -5 -8.45 L 1 -2.45 L 1 3.95 L 4.5 3.95 L 0 8.45 Z",
						fill: O,
						refX: "50%",
						refY: "50%"
					},
					label: {
						text: "Flowchart end",
						textWrap: {
							width: 200,
							height: 100,
							ellipsis: !0
						},
						refX: "50%",
						refDy: w,
						textAnchor: "middle",
						textVerticalAnchor: "top",
						fill: "#55627B",
						fontFamily: h,
						fontSize: 13
					}
				}
			}, {
				markup: [{
					tagName: "circle",
					selector: "body"
				}, {
					tagName: "path",
					selector: "icon"
				}, {
					tagName: "text",
					selector: "label"
				}],
				boundaryPadding: {
					horizontal: w,
					top: w,
					bottom: I
				}
			}),
			X = g["dia"].Link.define(o.LINK, {
				attrs: {
					root: {
						cursor: "pointer"
					},
					line: {
						fill: "none",
						connection: !0,
						stroke: k,
						strokeWidth: N
					},
					wrapper: {
						fill: "none",
						connection: !0,
						stroke: "transparent",
						strokeWidth: 10
					},
					arrowhead: {
						d: "M -5 -2.5 0 0 -5 2.5 Z",
						stroke: k,
						fill: k,
						atConnectionRatio: .55,
						strokeWidth: N
					}
				},
				labels: [{
					attrs: {
						labelText: {
							text: "Label"
						}
					},
					position: {
						distance: .25
					}
				}]
			}, {
				markup: [{
					tagName: "path",
					selector: "line"
				}, {
					tagName: "path",
					selector: "wrapper"
				}, {
					tagName: "path",
					selector: "arrowhead"
				}],
				defaultLabel: {
					markup: [{
						tagName: "rect",
						selector: "labelBody"
					}, {
						tagName: "text",
						selector: "labelText"
					}],
					attrs: {
						labelText: {
							fontFamily: h,
							fontSize: 13,
							textWrap: {
								width: 200,
								height: 100,
								ellipsis: !0
							},
							cursor: "pointer",
							fill: k,
							textAnchor: "middle",
							textVerticalAnchor: "middle",
							pointerEvents: "none"
						},
						labelBody: {
							ref: "labelText",
							fill: S,
							stroke: S,
							strokeWidth: 2,
							refWidth: "100%",
							refHeight: "100%",
							refX: 0,
							refY: 0
						}
					}
				}
			});
		Object.assign(g["shapes"], {
				app: {
					Base: R,
					Message: J,
					FlowchartStart: _,
					FlowchartEnd: V,
					Link: X
				}
			}),
			function (e) {
				e["MESSAGE"] = "stencil.Message", e["FLOWCHART_START"] = "stencil.FlowchartStart", e["FLOWCHART_END"] = "stencil.FlowchartEnd"
			}(W || (W = {}));
		var Q = 48,
			$ = g["dia"].Element.define(W.FLOWCHART_START, {
				name: "FlowchartStart",
				size: {
					width: Q,
					height: Q
				},
				attrs: {
					body: {
						fill: T,
						stroke: "none",
						refCx: "50%",
						refCy: "50%",
						refR: "50%"
					},
					icon: {
						d: "M 2 8 L 4.29 5.71 L 1.41 2.83 L 2.83 1.41 L 5.71 4.29 L 8 2 L 8 8 Z M -2 8 L -8 8 L -8 2 L -5.71 4.29 L -1 -0.41 L -1 -8 L 1 -8 L 1 0.41 L -4.29 5.71 Z",
						fill: "#FFFFFF",
						refX: "50%",
						refY: "50%"
					},
					label: {
						text: "Start",
						refDx: w,
						refY: "50%",
						textAnchor: "start",
						textVerticalAnchor: "middle",
						fill: "#242424",
						fontFamily: h,
						fontSize: 13
					}
				}
			}, {
				markup: [{
					tagName: "circle",
					selector: "body"
				}, {
					tagName: "path",
					selector: "icon"
				}, {
					tagName: "text",
					selector: "label"
				}]
			}),
			U = g["dia"].Element.define(W.FLOWCHART_END, {
				name: "FlowchartEnd",
				size: {
					width: Q,
					height: Q
				},
				attrs: {
					body: {
						fill: T,
						stroke: "none",
						refCx: "50%",
						refCy: "50%",
						refR: "50%"
					},
					icon: {
						d: "M 5 -8.45 L 6.41 -7.04 L 3 -3.635 L 1.59 -5.04 Z M -4.5 3.95 L -1 3.95 L -1 -1.63 L -6.41 -7.04 L -5 -8.45 L 1 -2.45 L 1 3.95 L 4.5 3.95 L 0 8.45 Z",
						fill: "#FFFFFF",
						refX: "50%",
						refY: "50%"
					},
					label: {
						text: "End",
						refDx: w,
						refY: "50%",
						textAnchor: "start",
						textVerticalAnchor: "middle",
						fill: "#242424",
						fontFamily: h,
						fontSize: 13
					}
				}
			}, {
				markup: [{
					tagName: "circle",
					selector: "body"
				}, {
					tagName: "path",
					selector: "icon"
				}, {
					tagName: "text",
					selector: "label"
				}]
			}),
			K = g["dia"].Element.define(W.MESSAGE, {
				name: "Message",
				size: {
					width: Q,
					height: Q
				},
				attrs: {
					body: {
						fill: O,
						stroke: "#E8E8E8",
						refCx: "50%",
						refCy: "50%",
						refR: "50%"
					},
					icon: {
						width: 20,
						height: 20,
						refX: "50%",
						refY: "50%",
						x: -10,
						y: -10,
						xlinkHref: B
					},
					label: {
						text: "Component",
						refDx: w,
						refY: "50%",
						textAnchor: "start",
						textVerticalAnchor: "middle",
						fill: "#242424",
						fontFamily: h,
						fontSize: 13
					}
				}
			}, {
				markup: [{
					tagName: "circle",
					selector: "body"
				}, {
					tagName: "image",
					selector: "icon"
				}, {
					tagName: "text",
					selector: "label"
				}]
			});

		function q(e, t, a, o) {
			var i = new g["dia"].Graph({}, {
					cellNamespace: g["shapes"]
				}),
				n = new g["dia"].Paper({
					model: i,
					async: !0,
					sorting: g["dia"].Paper.sorting.APPROX,
					gridSize: x,
					linkPinning: !1,
					multiLinks: !1,
					snapLinks: !0,
					moveThreshold: 5,
					magnetThreshold: "onleave",
					background: {
						color: S
					},
					cellViewNamespace: g["shapes"],
					interactive: {
						labelMove: !0,
						linkMove: !1
					},
					defaultRouter: {
						name: "manhattan",
						args: {
							padding: {
								bottom: w,
								vertical: I,
								horizontal: I
							},
							step: x
						}
					},
					defaultConnector: {
						name: "rounded"
					},
					defaultLink: function () {
						return new g["shapes"].app.Link
					},
					validateConnection: function (e, t, a, o) {
						return e !== a && ("in" === a.findAttribute("port-group", o) && "out" === e.findAttribute("port-group", t))
					}
				}),
				r = new g["ui"].PaperScroller({
					paper: n,
					autoResizePaper: !0,
					contentOptions: {
						padding: 100,
						allowNewOrigin: "any"
					},
					scrollWhileDragging: !0,
					cursor: "grab",
					baseWidth: 1e3,
					baseHeight: 1e3
				});
			t.appendChild(r.el), r.render().center();
			var s = new g["ui"].Stencil({
				paper: r,
				width: 240,
				scaleClones: !0,
				dropAnimation: !0,
				paperOptions: {
					sorting: g["dia"].Paper.sorting.NONE,
					background: {
						color: D
					}
				},
				dragStartClone: function (e) {
					var t = e.get("name"),
						a = g["shapes"].app[t];
					if (!a) throw new Error("Invalid stencil shape name: ".concat(t));
					return a.fromStencilShape(e)
				},
				layout: {
					columns: 1,
					rowGap: I,
					rowHeight: "auto",
					marginY: I,
					marginX: -w,
					dx: 0,
					dy: 0,
					resizeToFit: !1
				}
			});
			a.appendChild(s.el), s.render();
			var l = new g["dia"].CommandManager({
					graph: i
				}),
				c = new g["ui"].Toolbar({
					tools: F.tools,
					autoToggle: !0,
					references: {
						paperScroller: r,
						commandManager: l
					}
				});
			o.appendChild(c.el), c.render();
			var d = new g["ui"].Tooltip({
					rootTarget: e,
					container: e,
					target: "[data-tooltip]",
					direction: g["ui"].Tooltip.TooltipArrowPosition.Auto,
					padding: I,
					animation: !0
				}),
				p = new g["ui"].Keyboard;
			return {
				graph: i,
				paper: n,
				scroller: r,
				stencil: s,
				toolbar: c,
				tooltip: d,
				keyboard: p,
				history: l
			}
		}
		Object.assign(g["shapes"], {
			stencil: {
				Message: K,
				FlowchartStart: $,
				FlowchartEnd: U
			}
		});
		a("4de4"), a("caad"), a("2532");
		var ee, te = a("ade3");
		a("c0b6");
		(function (e) {
			e["JSON_EDITOR_CHANGED"] = "json-editor-changed", e["SELECTION_CHANGED"] = "selection-changed", e["GRAPH_CHANGED"] = "graph-changed",
				e["GRAPH_START_BATCH"] = "graph-start-batch", e["GRAPH_STOP_BATCH"] = "graph-stop-batch"
		})(ee || (ee = {}));
		var ae = function () {
				function e(t) {
					Object(s["a"])(this, e), this.service = t, this.startListening()
				}
				return Object(l["a"])(e, [{
					key: "stopListening",
					value: function () {
						b["Events"].stopListening.call(this)
					}
				}, {
					key: "listenTo",
					value: function (e, t) {
						var a = this;
						Object.keys(t).forEach((function (o) {
							var i = t[o];
							"function" === typeof i && b["Events"].listenTo.call(a, e, o, i.bind(null, a.service))
						}))
					}
				}]), e
			}(),
			oe = (a("45fc"), a("07ac"), g["elementTools"].Remove.extend({
				options: {
					useModelGeometry: !0,
					action: function (e, t) {
						t.notify("cell:tool:remove", e)
					},
					markup: [{
						tagName: "circle",
						selector: "button",
						attributes: {
							r: 10,
							fill: "#FD0B88",
							cursor: "pointer",
							"data-tooltip": "Remove <i>(Del)</i>",
							"data-tooltip-position": "bottom"
						}
					}, {
						tagName: "path",
						selector: "icon",
						attributes: {
							d: "M -4 -4 4 4 M -4 4 4 -4",
							fill: "none",
							stroke: "#FFFFFF",
							"stroke-width": 2,
							"pointer-events": "none"
						}
					}]
				}
			}));

		function ie(e) {
			e.model.isLink() ? re(e) : ne(e)
		}

		function ne(e) {
			var t = e.model,
				a = t.getBoundaryPadding(),
				o = new g["dia"].ToolsView({
					tools: [new g["elementTools"].Boundary({
						useModelGeometry: !0,
						padding: a
					}), new oe({
						x: "100%",
						offset: {
							x: a.right,
							y: -a.top
						}
					})]
				});
			e.addTools(o)
		}

		function re(e) {
			var t = new g["dia"].ToolsView({
				tools: [new g["linkTools"].Vertices, new g["linkTools"].SourceArrowhead, new g["linkTools"].TargetArrowhead, new g["linkTools"].Boundary({
					padding: 15
				}), new oe({
					offset: -20,
					distance: 40
				})]
			});
			e.addTools(t)
		}
		var se = {
			shapes: [{
				name: "FlowchartStart"
			}, {
				name: "FlowchartEnd"
			}, {
				name: "Message",
				attrs: {
					label: {
						text: "User action"
					},
					icon: {
						xlinkHref: H
					}
				}
			}, {
				name: "Message",
				attrs: {
					label: {
						text: "Entity"
					},
					icon: {
						xlinkHref: Z
					}
				}
			}, {
				name: "Message",
				attrs: {
					label: {
						text: "Message"
					},
					icon: {
						xlinkHref: B
					}
				}
			}, {
				name: "Message",
				attrs: {
					label: {
						text: "Confirmation"
					},
					icon: {
						xlinkHref: G
					}
				}
			}]
		};

		function le(e, t) {
			var a = e.paper,
				o = e.selection,
				i = e.eventBusService;
			a.removeTools(), o.forEach((function (e) {
				var t = e.findView(a);
				t && t.vel.removeClass("selected")
			})), e.selection = t, t.forEach((function (e) {
				var t = e.findView(a);
				t && (t.vel.addClass("selected"), ie(t))
			})), i.emit(ee.SELECTION_CHANGED, t)
		}

		function ce(e) {
			var t = e.selection,
				a = e.graph;
			0 !== t.length && a.removeCells(t)
		}

		function de(e, t, a, o) {
			var i = e.scroller;
			i.zoom(t, {
				min: E,
				max: A,
				grid: z,
				ox: a,
				oy: o
			})
		}

		function pe(e) {
			var t = e.scroller;
			t.zoomToFit({
				minScale: E,
				maxScale: A,
				scaleGrid: z,
				useModelGeometry: !0,
				padding: w
			})
		}

		function ue(e) {
			var t = e.scroller;
			t.zoom(z, {
				min: E,
				max: A
			})
		}

		function be(e) {
			var t = e.scroller;
			t.zoom(-z, {
				min: E,
				max: A
			})
		}

		function fe(e) {
			var t = e.paper;
			t.hideTools(), t.toPNG((function (a) {
				t.showTools(), ge(e, a)
			}), {
				padding: 10,
				useComputedStyles: !1
			})
		}

		function ge(e, t) {
			var a = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "Rappid",
				o = e.keyboard,
				i = e.controllers,
				n = i.keyboard;
			n.stopListening();
			var r = new g["ui"].Lightbox({
				image: t,
				downloadable: !0,
				fileName: a
			});
			r.on("action:close", (function () {
				n.startListening()
			})), r.listenTo(o, "escape", (function () {
				n.startListening(), r.close()
			})), r.open()
		}

		function me(e, t) {
			le(e, []);
			var a = e.graph,
				i = e.history,
				n = Object.values(o);
			i.reset();
			try {
				if (t.cells.some((function (e) {
						return !n.includes(e.type)
					}))) throw new Error("Invalid JSON: Unknown Cell Type");
				a.fromJSON(t)
			} catch (r) {}
		}

		function he(e) {
			var t = e.stencil,
				a = se.shapes.map((function (e) {
					return new g["shapes"].stencil[e.name](e)
				}));
			t.load(a)
		}

		function Me(e) {
			var t = e.paper,
				a = e.graph;
			a.getLinks().forEach((function (e) {
				var a = e.findView(t);
				a && a.requestConnectionUpdate()
			}))
		}

		function ve(e) {
			var t = e.history;
			t.undo()
		}

		function ye(e) {
			var t = e.history;
			t.redo()
		}
		var Le = 500,
			xe = .2,
			Ie = function (e) {
				Object(c["a"])(a, e);
				var t = Object(d["a"])(a);

				function a() {
					return Object(s["a"])(this, a), t.apply(this, arguments)
				}
				return Object(l["a"])(a, [{
					key: "startListening",
					value: function () {
						var e, t = this.service,
							a = t.graph,
							o = t.paper,
							i = t.toolbar,
							n = t.eventBusService;
						this.listenTo(n, (e = {}, Object(te["a"])(e, ee.GRAPH_START_BATCH, we), Object(te["a"])(e, ee.GRAPH_STOP_BATCH, je), e)), this.listenTo(
							a, {
								add: Ce,
								remove: Se,
								"change:ports": De,
								"change add remove": g["util"].debounce(Oe, Le)
							}), this.listenTo(o, {
							"cell:mousewheel": Ne,
							"blank:mousewheel": Te,
							"blank:pointerdown": ke,
							"cell:pointerup": Pe,
							"cell:tool:remove": He,
							"element:pointermove": Ae,
							"element:pointerup": Ee,
							"element:port:add": ze,
							"element:port:remove": Be,
							scale: Ge
						}), this.listenTo(i, {
							"png:pointerclick": Ze
						})
					}
				}]), a
			}(ae);

		function we(e, t) {
			var a = e.graph;
			a.startBatch(t)
		}

		function je(e, t) {
			var a = e.graph;
			a.stopBatch(t)
		}

		function Ce(e, t) {
			t.isLink() || (le(e, [t]), Me(e))
		}

		function Se(e, t) {
			var a = e.selection;
			a.includes(t) && (le(e, a.filter((function (e) {
				return e !== t
			}))), t.isElement() && Me(e))
		}

		function De(e, t) {
			t.toggleAddPortButton("out")
		}

		function Oe(e) {
			var t = e.graph,
				a = e.eventBusService;
			a.emit(ee.GRAPH_CHANGED, t.toJSON())
		}

		function ke(e, t) {
			var a = e.scroller;
			le(e, []), a.startPanning(t)
		}

		function Te(e, t, a, o, i) {
			t.preventDefault(), de(e, i * xe, a, o)
		}

		function Ne(e, t, a, o, i, n) {
			a.preventDefault(), de(e, n * xe, o, i)
		}

		function Pe(e, t) {
			le(e, [t.model])
		}

		function Ae(e, t, a) {
			var o = e.paper,
				i = a.data;
			i.pointermoveCalled || (i.pointermoveCalled = !0, o.hideTools())
		}

		function Ee(e, t, a) {
			var o = e.paper,
				i = a.data;
			i.pointermoveCalled && (o.showTools(), Me(e))
		}

		function ze(e, t, a) {
			a.stopPropagation();
			var o = t.model;
			o.addDefaultPort()
		}

		function Be(e, t, a) {
			a.stopPropagation();
			var o = t.findAttribute("port", a.target),
				i = t.model;
			i.removePort(o)
		}

		function He(e, t, a) {
			t.model.remove()
		}

		function Ge(e) {
			var t = e.tooltip;
			t.hide()
		}

		function Ze(e) {
			fe(e)
		}
		var Fe = function (e) {
			Object(c["a"])(a, e);
			var t = Object(d["a"])(a);

			function a() {
				return Object(s["a"])(this, a), t.apply(this, arguments)
			}
			return Object(l["a"])(a, [{
				key: "startListening",
				value: function () {
					var e = this.service.keyboard;
					this.listenTo(e, {
						escape: We,
						"delete backspace": Ye,
						"ctrl+0": _e,
						"ctrl+plus": Re,
						"ctrl+minus": Je,
						"ctrl+z": Ve,
						"ctrl+y": Xe,
						"ctrl+e": Qe
					})
				}
			}]), a
		}(ae);

		function We(e) {
			le(e, [])
		}

		function Ye(e) {
			ce(e)
		}

		function Re(e, t) {
			t.preventDefault(), ue(e)
		}

		function Je(e, t) {
			t.preventDefault(), be(e)
		}

		function _e(e) {
			pe(e)
		}

		function Ve(e) {
			ve(e)
		}

		function Xe(e) {
			ye(e)
		}

		function Qe(e) {
			fe(e)
		}
		var $e = "rappid-scope",
			Ue = function () {
				function e(t, a, o, i, n) {
					Object(s["a"])(this, e), this.scopeElement = t, this.eventBusService = n, this.selection = [], this.subscriptions = new f["a"], t.classList
						.add($e), Object.assign(this, q(t, a, o, i)), this.controllers = {
							rappid: new Ie(this),
							keyboard: new Fe(this)
						}, this.subscriptions.add(n.events().subscribe((function (e) {
							var t = e.name,
								a = e.value;
							return b["Events"].trigger.call(n, t, a)
						})))
				}
				return Object(l["a"])(e, [{
					key: "destroy",
					value: function () {
						var e = this.paper,
							t = this.scroller,
							a = this.stencil,
							o = this.toolbar,
							i = this.tooltip,
							n = this.controllers,
							r = this.subscriptions,
							s = this.scopeElement;
						e.remove(), t.remove(), a.remove(), o.remove(), i.remove(), Object.keys(n).forEach((function (e) {
							return n[e].stopListening()
						})), r.unsubscribe(), s.classList.remove($e)
					}
				}]), e
			}(),
			Ke = Ue,
			qe = function () {
				var e = this,
					t = e.$createElement,
					a = e._self._c || t;
				return a("div", {
					staticClass: "json-editor-container"
				}, [a("textarea", {
					attrs: {
						placeholder: e.placeholder,
						spellcheck: "false"
					},
					domProps: {
						value: e._f("json")(e.content)
					},
					on: {
						input: function (t) {
							return e.parseJSON(t.target.value)
						}
					}
				})])
			},
			et = [],
			tt = a("2bd2"),
			at = a("1a2d"),
			ot = a("60a3"),
			it = 500,
			nt = function (e) {
				Object(c["a"])(a, e);
				var t = Object(d["a"])(a);

				function a() {
					var e;
					return Object(s["a"])(this, a), e = t.apply(this, arguments), e.placeholder = 'e.g. { "cells": [{ "type": "app.Message"}] }', e.contentSubject =
						new tt["a"], e
				}
				return Object(l["a"])(a, [{
					key: "mounted",
					value: function () {
						var e = this.contentSubject,
							t = this.$eventBusService;
						e.pipe(Object(at["a"])(it)).subscribe((function (e) {
							t.emit(ee.JSON_EDITOR_CHANGED, e)
						}))
					}
				}, {
					key: "parseJSON",
					value: function (e) {
						var t, a = this.contentSubject;
						if (e) try {
							t = JSON.parse(e)
						} catch (o) {
							return
						} else t = {
							cells: []
						};
						a.next(t)
					}
				}]), a
			}(i["a"]);
		Object(p["a"])([Object(ot["a"])()], nt.prototype, "content", void 0), nt = Object(p["a"])([Object(u["b"])({
			filters: {
				json: function (e) {
					return JSON.stringify(e, null, 2)
				}
			}
		})], nt);
		var rt = nt,
			st = rt,
			lt = (a("4f74"), a("2877")),
			ct = Object(lt["a"])(st, qe, et, !1, null, "7f388053", null),
			dt = ct.exports,
			pt = function () {
				var e = this,
					t = e.$createElement,
					a = e._self._c || t;
				return a("div", {
					staticClass: "inspector-container",
					class: {
						"disabled-container": !e.cell
					}
				}, [e.cell ? a("div", [e.cell.get("type") === e.shapeTypesEnum.MESSAGE ? a("MessageInspector", {
					attrs: {
						cell: e.cell
					}
				}) : e.cell.get("type") === e.shapeTypesEnum.LINK ? a("LinkInspector", {
					attrs: {
						cell: e.cell
					}
				}) : e.cell.get("type") === e.shapeTypesEnum.FLOWCHART_START || e.cell.get("type") === e.shapeTypesEnum.FLOWCHART_END ? a(
					"LabelInspector", {
						attrs: {
							cell: e.cell
						}
					}) : e._e()], 1) : a("div", [a("h1", [e._v("Component")]), e._m(0)])])
			},
			ut = [function () {
				var e = this,
					t = e.$createElement,
					a = e._self._c || t;
				return a("label", [e._v("Label "), a("input", {
					attrs: {
						disabled: ""
					}
				})])
			}],
			bt = a("3835"),
			ft = function () {
				var e = this,
					t = e.$createElement,
					a = e._self._c || t;
				return a("div", [a("h1", [e._v("Component")]), a("label", [e._v("Label "), a("input", {
					directives: [{
						name: "batch",
						rawName: "v-batch"
					}, {
						name: "model",
						rawName: "v-model",
						value: e.label,
						expression: "label"
					}],
					attrs: {
						placeholder: "Enter label"
					},
					domProps: {
						value: e.label
					},
					on: {
						input: [function (t) {
							t.target.composing || (e.label = t.target.value)
						}, function (t) {
							return e.changeCellProp(e.props.label, e.label)
						}]
					}
				})]), a("label", [e._v("Description "), a("input", {
					directives: [{
						name: "batch",
						rawName: "v-batch"
					}, {
						name: "model",
						rawName: "v-model",
						value: e.description,
						expression: "description"
					}],
					attrs: {
						type: "text",
						placeholder: "Enter description"
					},
					domProps: {
						value: e.description
					},
					on: {
						input: [function (t) {
							t.target.composing || (e.description = t.target.value)
						}, function (t) {
							return e.changeCellProp(e.props.description, e.description)
						}]
					}
				})]), a("label", [e._v("Icon (Base64) "), a("span", {
					staticClass: "icon-input-logo"
				}), a("input", {
					directives: [{
						name: "batch",
						rawName: "v-batch"
					}, {
						name: "model",
						rawName: "v-model",
						value: e.icon,
						expression: "icon"
					}],
					staticClass: "icon-input",
					attrs: {
						type: "text",
						placeholder: "Enter icon",
						spellcheck: "false"
					},
					domProps: {
						value: e.icon
					},
					on: {
						input: [function (t) {
							t.target.composing || (e.icon = t.target.value)
						}, function (t) {
							return e.changeCellProp(e.props.icon, e.icon)
						}]
					}
				})]), a("div", {
					staticClass: "ports"
				}, [a("div", {
					staticClass: "out-ports-bar"
				}, [a("span", [e._v("Out Ports")]), a("button", {
					staticClass: "add-port",
					attrs: {
						disabled: !e.canAddPort,
						"data-tooltip": "Add Output Port"
					},
					on: {
						click: function (t) {
							return e.addCellPort()
						}
					}
				})]), e._l(e.ports, (function (t) {
					return a("div", {
						key: t.id,
						staticClass: "port"
					}, [a("input", {
						directives: [{
							name: "batch",
							rawName: "v-batch"
						}, {
							name: "model",
							rawName: "v-model",
							value: t.label,
							expression: "port.label"
						}],
						attrs: {
							placeholder: "Label"
						},
						domProps: {
							value: t.label
						},
						on: {
							input: [function (a) {
								a.target.composing || e.$set(t, "label", a.target.value)
							}, function (a) {
								return e.changeCellPort(t)
							}]
						}
					}), a("div", {
						staticClass: "remove-port",
						attrs: {
							"data-tooltip": "Remove Output Port"
						},
						on: {
							click: function (a) {
								return e.removeCellPort(t.id)
							}
						}
					})])
				}))], 2)])
			},
			gt = [],
			mt = (a("a4d3"), a("e01a"), function (e) {
				Object(c["a"])(a, e);
				var t = Object(d["a"])(a);

				function a() {
					return Object(s["a"])(this, a), t.apply(this, arguments)
				}
				return Object(l["a"])(a, [{
					key: "onPropertyChanged",
					value: function (e, t) {
						this.removeCellListener(t), this.addCellListener(e), this.assignFormFields()
					}
				}, {
					key: "mounted",
					value: function () {
						this.addCellListener(this.cell), this.assignFormFields()
					}
				}, {
					key: "beforeDestroy",
					value: function () {
						this.removeCellListener(this.cell)
					}
				}, {
					key: "changeCellProp",
					value: function (e, t) {
						this.cell.prop(e, t)
					}
				}, {
					key: "addCellListener",
					value: function (e) {
						var t = this;
						e.on("change", (function () {
							return t.assignFormFields()
						}), this)
					}
				}, {
					key: "removeCellListener",
					value: function (e) {
						e.off(null, null, this)
					}
				}]), a
			}(i["a"]));
		Object(p["a"])([Object(ot["a"])()], mt.prototype, "cell", void 0), Object(p["a"])([Object(ot["b"])("cell")], mt.prototype,
			"onPropertyChanged", null), mt = Object(p["a"])([Object(u["b"])({})], mt);
		var ht = function (e) {
			Object(c["a"])(a, e);
			var t = Object(d["a"])(a);

			function a() {
				var e;
				return Object(s["a"])(this, a), e = t.apply(this, arguments), e.label = "", e.description = "", e.icon = "", e.ports = [], e.canAddPort = !
					1, e.props = {
						label: ["attrs", "label", "text"],
						description: ["attrs", "description", "text"],
						icon: ["attrs", "icon", "xlinkHref"],
						portLabel: ["attrs", "portLabel", "text"]
					}, e
			}
			return Object(l["a"])(a, [{
				key: "addCellPort",
				value: function () {
					this.cell.addDefaultPort(), this.assignFormPorts()
				}
			}, {
				key: "removeCellPort",
				value: function (e) {
					this.cell.removePort(e), this.assignFormPorts()
				}
			}, {
				key: "changeCellPort",
				value: function (e) {
					var t = this.cell,
						a = this.props;
					t.portProp(e.id, a.portLabel, e.label)
				}
			}, {
				key: "assignFormFields",
				value: function () {
					var e = this.cell,
						t = this.props;
					this.label = e.prop(t.label), this.description = e.prop(t.description), this.icon = e.prop(t.icon), this.assignFormPorts()
				}
			}, {
				key: "assignFormPorts",
				value: function () {
					var e = this.cell,
						t = this.props;
					this.canAddPort = e.canAddPort("out"), this.ports = e.getGroupPorts("out").map((function (a) {
						var o = a.id;
						return {
							id: o,
							label: e.portProp(o, t.portLabel)
						}
					}))
				}
			}]), a
		}(mt);
		Object(p["a"])([Object(ot["a"])()], ht.prototype, "cell", void 0), ht = Object(p["a"])([Object(u["b"])({})], ht);
		var Mt = ht,
			vt = Mt,
			yt = Object(lt["a"])(vt, ft, gt, !1, null, null, null),
			Lt = yt.exports,
			xt = function () {
				var e = this,
					t = e.$createElement,
					a = e._self._c || t;
				return a("div", [a("h1", [e._v("Component")]), a("label", [e._v("Label "), a("input", {
					directives: [{
						name: "batch",
						rawName: "v-batch"
					}, {
						name: "model",
						rawName: "v-model",
						value: e.label,
						expression: "label"
					}],
					attrs: {
						type: "text",
						placeholder: "Enter label"
					},
					domProps: {
						value: e.label
					},
					on: {
						input: [function (t) {
							t.target.composing || (e.label = t.target.value)
						}, function (t) {
							return e.changeCellProp(e.props.label, e.label)
						}]
					}
				})])])
			},
			It = [],
			wt = function (e) {
				Object(c["a"])(a, e);
				var t = Object(d["a"])(a);

				function a() {
					var e;
					return Object(s["a"])(this, a), e = t.apply(this, arguments), e.label = "", e.props = {
						label: ["attrs", "label", "text"]
					}, e
				}
				return Object(l["a"])(a, [{
					key: "assignFormFields",
					value: function () {
						var e = this.cell,
							t = this.props;
						this.label = e.prop(t.label)
					}
				}]), a
			}(mt);
		wt = Object(p["a"])([Object(u["b"])({})], wt);
		var jt = wt,
			Ct = jt,
			St = Object(lt["a"])(Ct, xt, It, !1, null, null, null),
			Dt = St.exports,
			Ot = function () {
				var e = this,
					t = e.$createElement,
					a = e._self._c || t;
				return a("div", [a("h1", [e._v("Link")]), a("label", [e._v("Label "), a("input", {
					directives: [{
						name: "batch",
						rawName: "v-batch"
					}, {
						name: "model",
						rawName: "v-model",
						value: e.label,
						expression: "label"
					}],
					attrs: {
						type: "text",
						placeholder: "Enter label"
					},
					domProps: {
						value: e.label
					},
					on: {
						input: [function (t) {
							t.target.composing || (e.label = t.target.value)
						}, function (t) {
							return e.changeCellProp(e.props.label, e.label)
						}]
					}
				})])])
			},
			kt = [],
			Tt = function (e) {
				Object(c["a"])(a, e);
				var t = Object(d["a"])(a);

				function a() {
					var e;
					return Object(s["a"])(this, a), e = t.apply(this, arguments), e.label = "", e.props = {
						label: ["labels", 0, "attrs", "labelText", "text"]
					}, e
				}
				return Object(l["a"])(a, [{
					key: "assignFormFields",
					value: function () {
						var e = this.cell,
							t = this.props;
						this.label = e.prop(t.label)
					}
				}]), a
			}(mt);
		Tt = Object(p["a"])([Object(u["b"])({})], Tt);
		var Nt = Tt,
			Pt = Nt,
			At = Object(lt["a"])(Pt, Ot, kt, !1, null, null, null),
			Et = At.exports,
			zt = function (e) {
				Object(c["a"])(a, e);
				var t = Object(d["a"])(a);

				function a() {
					var e;
					return Object(s["a"])(this, a), e = t.apply(this, arguments), e.cell = null, e.subscriptions = new f["a"], e.shapeTypesEnum = o, e
				}
				return Object(l["a"])(a, [{
					key: "mounted",
					value: function () {
						var e = this;
						this.subscriptions.add(this.$eventBusService.on(ee.SELECTION_CHANGED, (function (t) {
							return e.setCell(t)
						})))
					}
				}, {
					key: "beforeDestroy",
					value: function () {
						this.subscriptions.unsubscribe()
					}
				}, {
					key: "setCell",
					value: function (e) {
						var t = Object(bt["a"])(e, 1),
							a = t[0],
							o = void 0 === a ? null : a;
						this.cell = o
					}
				}]), a
			}(i["a"]);
		zt = Object(p["a"])([Object(u["b"])({
			components: {
				MessageInspector: Lt,
				LinkInspector: Et,
				LabelInspector: Dt
			}
		})], zt);
		var Bt = zt,
			Ht = Bt,
			Gt = (a("b780"), Object(lt["a"])(Ht, pt, ut, !1, null, null, null)),
			Zt = Gt.exports,
			Ft = a("00e9"),
			Wt = function (e) {
				Object(c["a"])(a, e);
				var t = Object(d["a"])(a);

				function a() {
					var e;
					return Object(s["a"])(this, a), e = t.apply(this, arguments), e.rappid = null, e.stencilOpened = !0, e.jsonEditorOpened = !0, e.fileJSON = {},
						e.subscriptions = new f["a"], e
				}
				return Object(l["a"])(a, [{
					key: "mounted",
					value: function () {
						var e = this,
							t = this.$el,
							a = this.$refs,
							o = a.paper,
							i = a.stencil,
							n = a.toolbar,
							r = this.subscriptions,
							s = this.$eventBusService;
						r.add(s.on(ee.GRAPH_CHANGED, (function (t) {
							return e.onRappidGraphChange(t)
						}))), r.add(s.on(ee.JSON_EDITOR_CHANGED, (function (t) {
							return e.onJsonEditorChange(t)
						}))), this.rappid = new Ke(t, o, i, n, s), this.setStencilContainerSize(), this.onStart()
					}
				}, {
					key: "beforeDestroy",
					value: function () {
						this.subscriptions.unsubscribe(), this.rappid.destroy()
					}
				}, {
					key: "openFile",
					value: function (e) {
						var t = this.rappid;
						this.fileJSON = e, me(t, e), pe(t)
					}
				}, {
					key: "toggleJsonEditor",
					value: function () {
						this.jsonEditorOpened = !this.jsonEditorOpened
					}
				}, {
					key: "toggleStencil",
					value: function () {
						this.stencilOpened = !this.stencilOpened, this.onStencilToggle()
					}
				}, {
					key: "onStart",
					value: function () {
						var e = this.rappid;
						he(e), this.openFile(Ft)
					}
				}, {
					key: "onJsonEditorChange",
					value: function (e) {
						var t = this.rappid;
						t && me(t, e)
					}
				}, {
					key: "onRappidGraphChange",
					value: function (e) {
						this.fileJSON = e
					}
				}, {
					key: "setStencilContainerSize",
					value: function () {
						this.$refs.stencil.style.width = "".concat(P, "px"), this.onStencilToggle()
					}
				}, {
					key: "onStencilToggle",
					value: function () {
						var e = this.rappid,
							t = this.stencilOpened,
							a = e.scroller,
							o = e.stencil;
						t ? (o.unfreeze(), a.el.scrollLeft += P) : (o.freeze(), a.el.scrollLeft -= P)
					}
				}]), a
			}(i["a"]);
		Wt = Object(p["a"])([Object(u["b"])({
			components: {
				Inspector: Zt,
				JsonEditor: dt
			}
		})], Wt);
		var Yt = Wt,
			Rt = Yt,
			Jt = (a("5c0b"), Object(lt["a"])(Rt, n, r, !1, null, null, null)),
			_t = Jt.exports,
			Vt = (a("f843"), a("5670")),
			Xt = a("ebb6"),
			Qt = function () {
				function e() {
					Object(s["a"])(this, e), this._events = new tt["a"], Object.assign(this, b["Events"])
				}
				return Object(l["a"])(e, [{
					key: "events",
					value: function () {
						return this._events.asObservable()
					}
				}, {
					key: "emit",
					value: function (e, t) {
						this._events.next({
							name: e,
							value: t
						})
					}
				}, {
					key: "on",
					value: function (e, t) {
						return this._events.pipe(Object(Vt["a"])((function (t) {
							return t.name === e
						})), Object(Xt["a"])((function (e) {
							return e.value
						}))).subscribe(t)
					}
				}]), e
			}(),
			$t = "inspector-input",
			Ut = {
				bind: function (e, t, a) {
					function o() {
						a.context.$eventBusService.emit(ee.GRAPH_START_BATCH, $t)
					}

					function i() {
						a.context.$eventBusService.emit(ee.GRAPH_STOP_BATCH, $t)
					}
					e.addEventListener("focus", o), e.addEventListener("focusout", i)
				}
			},
			Kt = Ut;
		i["a"].directive("batch", Kt), i["a"].prototype.$eventBusService = new Qt, new i["a"]({
			render: function (e) {
				return e(_t)
			}
		}).$mount("#app")
	},
	f843: function (e, t, a) {}
});
//# sourceMappingURL=app.3456650c.js.map