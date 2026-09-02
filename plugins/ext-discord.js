import e, { createContext as t, useContext as n, useEffect as r, useRef as i, useState as a } from "react";
//#region src/extensions/discord/index.tsx
var o = "1543294392247263315", s = `ws://127.0.0.1:6463/?v=1&client_id=${o}`, c = t(void 0), l = () => n(c), u = ({ children: t }) => {
	let [n, l] = a("disconnected"), [u, d] = a(!1), [f, p] = a(!1), [m, h] = a(!1), g = i(null), _ = i(!1), v = () => typeof crypto < "u" && crypto.randomUUID ? crypto.randomUUID() : String(Date.now()), y = (e) => {
		if (g.current && g.current.readyState === WebSocket.OPEN) try {
			let t = JSON.stringify({
				nonce: v(),
				...e
			});
			g.current.send(t), console.log("[Discord RPC] Payload sent:", e.cmd || e);
		} catch (e) {
			console.warn("[Discord RPC] Error sending payload:", e);
		}
		else console.warn("[Discord RPC] Cannot send payload: WebSocket is not open.");
	}, b = (e) => {
		if (!_.current) {
			console.warn("[Discord RPC] Cannot send SET_VOICE_SETTINGS: WebSocket is not authenticated yet.");
			return;
		}
		y({
			cmd: "SET_VOICE_SETTINGS",
			args: e
		});
	}, x = () => {
		let e = !f;
		p(e), b({ mute: e });
	}, S = () => {
		let e = !m;
		h(e), b({ deaf: e });
	}, C = (e, t) => {
		console.log(`[Discord RPC] Executing action: ${e}`, t), e === "discord_toggle_mute" ? x() : e === "discord_toggle_deafen" && S();
	};
	r(() => {
		let e = null, t = !1, n = () => {
			if (!t) {
				l("connecting"), d(!1), _.current = !1;
				try {
					let r = new WebSocket(s);
					g.current = r, r.onopen = () => {
						if (t) return;
						console.log("[Discord RPC] WebSocket connected to Discord Local RPC");
						let e = {
							cmd: "AUTHORIZE",
							args: {
								client_id: o,
								scopes: [
									"rpc",
									"rpc.voice.read",
									"rpc.voice.write"
								]
							},
							nonce: v()
						};
						try {
							r.send(JSON.stringify(e)), console.log("[Discord RPC] Payload sent: AUTHORIZE", e);
						} catch (e) {
							console.warn("[Discord RPC] Error sending AUTHORIZE payload:", e);
						}
					}, r.onmessage = (e) => {
						if (!t) {
							console.log("[Discord RPC] Message received:", e.data);
							try {
								let t = JSON.parse(e.data), n = t.cmd === "AUTHORIZE" && t.data && !t.evt?.includes("ERROR"), r = t.cmd === "DISPATCH" && t.evt === "READY";
								(n || r) && !_.current && (_.current = !0, d(!0), l("connected"), console.log("[Discord RPC] WebSocket successfully authorized and ready."), y({
									cmd: "SUBSCRIBE",
									evt: "VOICE_SETTINGS_UPDATE"
								}), y({
									cmd: "GET_VOICE_SETTINGS",
									args: {}
								})), t.data && (typeof t.data.mute == "boolean" && p(t.data.mute), typeof t.data.deaf == "boolean" && h(t.data.deaf));
							} catch {}
						}
					}, r.onerror = (e) => {
						t || (console.warn("[Discord RPC] WebSocket error:", e), l("error"));
					}, r.onclose = () => {
						t || (l("disconnected"), d(!1), _.current = !1, g.current = null, console.log("[Discord RPC] WebSocket closed. Retrying in 5s..."), e = setTimeout(n, 5e3));
					};
				} catch (r) {
					if (t) return;
					console.warn("[Discord RPC] Failed to create WebSocket:", r), l("disconnected"), d(!1), _.current = !1, g.current = null, e = setTimeout(n, 5e3);
				}
			}
		};
		return n(), () => {
			t = !0, e && clearTimeout(e), g.current &&= (g.current.onopen = null, g.current.onmessage = null, g.current.onerror = null, g.current.onclose = null, g.current.close(), null);
		};
	}, []);
	let w = {
		status: n,
		isConnected: n === "connected",
		isAuthenticated: u,
		isMuted: f,
		isDeafened: m,
		toggleMute: x,
		toggleDeafen: S,
		setVoiceSettings: b,
		sendPayload: y,
		executeAction: C
	};
	return typeof window < "u" && (window.FixTechPlugins = window.FixTechPlugins || {}, window.FixTechPlugins["ext-discord"] || (window.FixTechPlugins["ext-discord"] = {}), window.FixTechPlugins["ext-discord"].api = w, window.FixTechPlugins["ext-discord"].executeAction = C), /* @__PURE__ */ e.createElement(c.Provider, { value: w }, t);
}, d = () => {
	let t = l(), n = t?.status || (typeof window < "u" ? window.FixTechPlugins?.["ext-discord"]?.api?.status : "disconnected") || "disconnected", r = t?.isAuthenticated ?? (typeof window < "u" ? window.FixTechPlugins?.["ext-discord"]?.api?.isAuthenticated : !1);
	return /* @__PURE__ */ e.createElement("div", { className: "flex flex-col gap-4 p-4 bg-zinc-900/50 rounded-2xl border border-zinc-800" }, /* @__PURE__ */ e.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ e.createElement("div", null, /* @__PURE__ */ e.createElement("h3", { className: "text-sm font-bold text-zinc-100" }, "Discord Local RPC"), /* @__PURE__ */ e.createElement("p", { className: "text-xs text-zinc-400 mt-0.5" }, "Estado de la conexión en tiempo real con Discord")), (() => {
		if (n === "connected" && r) return /* @__PURE__ */ e.createElement("span", { className: "inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" }, /* @__PURE__ */ e.createElement("span", { className: "w-2 h-2 rounded-full bg-emerald-500 animate-pulse" }), "Conectado y Autorizado");
		switch (n) {
			case "connecting": return /* @__PURE__ */ e.createElement("span", { className: "inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20" }, /* @__PURE__ */ e.createElement("span", { className: "w-2 h-2 rounded-full bg-amber-500 animate-ping" }), "Esperando Autorización...");
			case "error": return /* @__PURE__ */ e.createElement("span", { className: "inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20" }, /* @__PURE__ */ e.createElement("span", { className: "w-2 h-2 rounded-full bg-rose-500" }), "Error de Conexión");
			default: return /* @__PURE__ */ e.createElement("span", { className: "inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-zinc-500/10 text-zinc-400 border border-zinc-500/20" }, /* @__PURE__ */ e.createElement("span", { className: "w-2 h-2 rounded-full bg-zinc-500" }), "Desconectado");
		}
	})()), /* @__PURE__ */ e.createElement("div", { className: "text-xs text-zinc-500 bg-zinc-950/50 p-3 rounded-xl border border-zinc-800/50" }, /* @__PURE__ */ e.createElement("span", { className: "font-semibold text-zinc-400" }, "Client ID:"), " ", o));
}, f = [{
	id: "discord_toggle_mute",
	label: "Alternar Silencio (Mute)",
	actionType: "discord_toggle_mute",
	category: "Discord",
	icon: "MicOff",
	desc: "Silenciar / Desmutear en Discord",
	rutaArchivo: "discord_toggle_mute",
	requiresConfig: !1,
	requiresInput: !1,
	execute: (e) => {
		let t = typeof window < "u" ? window.FixTechPlugins?.["ext-discord"] : void 0;
		t?.api?.toggleMute ? t.api.toggleMute() : t?.executeAction && t.executeAction("discord_toggle_mute", e);
	}
}, {
	id: "discord_toggle_deafen",
	label: "Alternar Ensordecer (Deafen)",
	actionType: "discord_toggle_deafen",
	category: "Discord",
	icon: "VolumeX",
	desc: "Ensordecer / Desensordecer en Discord",
	rutaArchivo: "discord_toggle_deafen",
	requiresConfig: !1,
	requiresInput: !1,
	execute: (e) => {
		let t = typeof window < "u" ? window.FixTechPlugins?.["ext-discord"] : void 0;
		t?.api?.toggleDeafen ? t.api.toggleDeafen() : t?.executeAction && t.executeAction("discord_toggle_deafen", e);
	}
}], p = {
	Provider: u,
	SettingsPanel: d,
	actions: f,
	executeAction: (e, t) => {
		let n = typeof window < "u" ? window.FixTechPlugins?.["ext-discord"] : void 0;
		n?.api?.executeAction && n.api.executeAction(e, t);
	}
};
typeof window < "u" && (window.FixTechPlugins = window.FixTechPlugins || {}, window.FixTechPlugins["ext-discord"] = p);
//#endregion
export { o as DISCORD_CLIENT_ID, s as DISCORD_RPC_URL, p as DiscordExtension, p as default, u as DiscordProvider, d as DiscordSettingsPanel, f as discordActions, l as useDiscord };
