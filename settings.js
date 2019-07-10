class Settings {
	static setMode(mode) {
		Settings.mode = mode;
		Settings.timescale = 1;
	}

	static viewModes() {
		let vMs = [];
		if (document.getElementById("show-segments").checked) {
			vMs.push("show-segments");
		}
		return vMs;
	}
}

Settings.mode = "movement"