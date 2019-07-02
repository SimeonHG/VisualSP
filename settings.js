class Settings {
	static setMode(mode) {
		Settings.mode = mode;
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