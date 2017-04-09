Vue.component('Configuration', {
	template: '{{include=template/pages/configuration.html}}',
	data: function(){
		return {
			configs: [],
			tracks: [],
			cars: [],
			activePaintings: [],
			selectedTrack: 0,
			selectedCar: 0,
			selectedPainting: 0,
			// ---
			selectedCars: [],
			weather: [],
			// ---
			_id: 0,
			name: 'Servername',
			pwd: '',
			admin_pwd: '',
			pickup_mode: false,
			race_overtime: 60,
			max_slots: 0,
			result_screen_time: 60,
			welcome: '',
			description: '',
			udp: 9600,
			tcp: 9600,
			http: 8081,
			packets_hz: 18,
			loop_mode: true,
			show_in_lobby: true,
			threads: 2,
			abs: '',
			tc: '',
			stability_aid: true,
			auto_clutch: true,
			tyre_blankets: false,
			force_virtual_mirror: false,
			fuel_rate: 100,
			damage_rate: 50,
			tires_wear_rate: 100,
			allowed_tires_out: 2,
			max_ballast: 150,
			disable_gas_cut_penality: false,
			dynamic_track: true,
			condition: '',
			start_value: 100,
			randomness: 0,
			transferred_grip: 100,
			laps_to_improve_grip: 1,
			kick_vote_quorum: 70,
			session_vote_quorum: 70,
			vote_duration: 15,
			blacklist: '',
			max_collisions_km: 5,
			booking: false,
			booking_time: 0,
			practice: true,
			practice_time: 15,
			can_join_practice: true,
			qualify: true,
			qualify_time: 15,
			can_join_qualify: true,
			race: true,
			race_laps: 10,
			race_time: 0,
			race_wait_time: 60,
			race_extra_lap: false,
			join_type: '',
			time: '08:00',
			sun_angle: 32,
			track: '',
			// ---
			err: 0,
			addEditConfig: false,
			removeConfig: false,
			saved: false,
			removed: false
		}
	},
	mounted: function(){
		this._load();
	},
	methods: {
		_load: function(){
			this.$http.get('/api/getAllConfigurations')
			.then(function(resp){
				if(resp.data.code){
					console.log(resp.data.code+': '+resp.data.msg);
					return;
				}

				this.configs = resp.data;
			});

			this.$http.get('/api/getAvailableTracks')
			.then(function(resp){
				if(resp.data.code){
					console.log(resp.data.code+': '+resp.data.msg);
					return;
				}

				this.tracks = resp.data;
			});

			this.$http.get('/api/getAvailableCars')
			.then(function(resp){
				if(resp.data.code){
					console.log(resp.data.code+': '+resp.data.msg);
					return;
				}

				this.cars = resp.data;

				if(this.cars.length){
					this.activePaintings = this.cars[0].paintings;
				}
			});
		},
		_reset: function(){
			this._id = 0;
			this.err = 0;
			this.addEditConfig = false;
			this.removeConfig = false;
			this.saved = false;
			this.removed = false;
		},
		_openConfig: function(id, copy){
			this.$http.get('/api/getConfiguration', {params: {id: id}})
			.then(function(resp){
				if(resp.data.code){
					console.log(resp.data.code+': '+resp.data.msg);
					return;
				}

				// config
				this.name = resp.data.name;
				this.pwd = resp.data.pwd;
				this.admin_pwd = resp.data.admin_pwd;
				this.pickup_mode = resp.data.pickup_mode;
				this.race_overtime = resp.data.race_overtime;
				this.max_slots = resp.data.max_slots;
				this.welcome = resp.data.welcome;
				this.description = resp.data.description;
				this.udp = resp.data.udp;
				this.tcp = resp.data.tcp;
				this.http = resp.data.http;
				this.packets_hz = resp.data.packets_hz;
				this.loop_mode = resp.data.loop_mode;
				this.show_in_lobby = resp.data.show_in_lobby;
				this.threads = resp.data.threads;
				this.abs = resp.data.abs;
				this.tc = resp.data.tc;
				this.stability_aid = resp.data.stability_aid;
				this.auto_clutch = resp.data.auto_clutch;
				this.tyre_blankets = resp.data.tyre_blankets;
				this.force_virtual_mirror = resp.data.force_virtual_mirror;
				this.fuel_rate = resp.data.fuel_rate;
				this.damage_rate = resp.data.damage_rate;
				this.tires_wear_rate = resp.data.tires_wear_rate;
				this.allowed_tires_out = resp.data.allowed_tires_out;
				this.max_ballast = resp.data.max_ballast;
				this.disable_gas_cut_penality = resp.data.disable_gas_cut_penality;
				this.result_screen_time = resp.data.result_screen_time;
				this.dynamic_track = resp.data.dynamic_track;
				this.condition = resp.data.condition;
				this.start_value = resp.data.start_value;
				this.randomness = resp.data.randomness;
				this.transferred_grip = resp.data.transferred_grip;
				this.laps_to_improve_grip = resp.data.laps_to_improve_grip;
				this.kick_vote_quorum = resp.data.kick_vote_quorum;
				this.session_vote_quorum = resp.data.session_vote_quorum;
				this.vote_duration = resp.data.vote_duration;
				this.blacklist = resp.data.blacklist;
				this.max_collisions_km = resp.data.max_collisions_km;
				this.booking = resp.data.booking;
				this.booking_time = resp.data.booking_time;
				this.practice = resp.data.practice;
				this.practice_time = resp.data.practice_time;
				this.can_join_practice = resp.data.can_join_practice;
				this.qualify = resp.data.qualify;
				this.qualify_time = resp.data.qualify_time;
				this.can_join_qualify = resp.data.can_join_qualify;
				this.race = resp.data.race;
				this.race_laps = resp.data.race_laps;
				this.race_time = resp.data.race_time;
				this.race_wait_time = resp.data.race_wait_time;
				this.race_extra_lap = resp.data.race_extra_lap;
				this.join_type = resp.data.join_type;
				this.time = resp.data.time;
				this.sun_angle = resp.data.sun_angle;

				if(copy){
					this.name += ' (copy)';
				}

				// track
				for(var i = 0; i < this.tracks.length; i++){
					if(this.tracks[i].name == resp.data.track){
						this.selectTrack(i);
						break;
					}
				}
				
				// weather
				this.weather = resp.data.weather;

				if(copy){
					for(var i = 0; i < this.weather.length; i++){
						this.weather[i].id = 0;
					}
				}

				// cars
				this.selectedCars = resp.data.cars;

				if(copy){
					for(var i = 0; i < this.selectedCars.length; i++){
						this.selectedCars[i].id = 0;
					}
				}

				this.addEditConfig = true;
			});
		},
		openAddEditConfig: function(id){
			this._reset();
			
			if(id){
				this._id = id;
				this._openConfig(id, false);
			}
			else{
				this.addEditConfig = true;
			}
		},
		openRemoveConfig: function(id){
			this._reset();

			if(!id){
				return;
			}

			this._id = id;
			this.removeConfig = true;
		},
		copyConfig: function(id){
			this._openConfig(id, true);
		},
		performAddEditConfig: function(){
			for(var i = 0; i < this.weather.length; i++){
				this.weather[i].base_ambient_temp = parseInt(this.weather[i].base_ambient_temp);
				this.weather[i].realistic_road_temp = parseInt(this.weather[i].realistic_road_temp);
				this.weather[i].base_road_temp = parseInt(this.weather[i].base_road_temp);
				this.weather[i].ambient_variation = parseInt(this.weather[i].ambient_variation);
				this.weather[i].road_variation = parseInt(this.weather[i].road_variation);
			}

			for(var i = 0; i < this.selectedCars.length; i++){
				this.selectedCars[i].position = i;
			}

			var data = {
				id: this._id,
				name: this.name,
				pwd: this.pwd,
				admin_pwd: this.admin_pwd,
				pickup_mode: this.pickup_mode,
				race_overtime: parseInt(this.race_overtime),
				max_slots: parseInt(this.max_slots),
				welcome: this.welcome,
				description: this.description,
				udp: parseInt(this.udp),
				tcp: parseInt(this.tcp),
				http: parseInt(this.http),
				packets_hz: parseInt(this.packets_hz),
				loop_mode: this.loop_mode,
				show_in_lobby: this.show_in_lobby,
				threads: parseInt(this.threads),
				abs: this.abs,
				tc: this.tc,
				stability_aid: this.stability_aid,
				auto_clutch: this.auto_clutch,
				tyre_blankets: this.tyre_blankets,
				force_virtual_mirror: this.force_virtual_mirror,
				fuel_rate: parseInt(this.fuel_rate),
				damage_rate: parseInt(this.damage_rate),
				tires_wear_rate: parseInt(this.tires_wear_rate),
				allowed_tires_out: parseInt(this.allowed_tires_out),
				max_ballast: parseInt(this.max_ballast),
				disable_gas_cut_penality: this.disable_gas_cut_penality,
				result_screen_time: parseInt(this.result_screen_time),
				dynamic_track: this.dynamic_track,
				condition: this.condition,
				start_value: parseInt(this.start_value),
				randomness: parseInt(this.randomness),
				transferred_grip: parseInt(this.transferred_grip),
				laps_to_improve_grip: parseInt(this.laps_to_improve_grip),
				kick_vote_quorum: parseInt(this.kick_vote_quorum),
				session_vote_quorum: parseInt(this.session_vote_quorum),
				vote_duration: parseInt(this.vote_duration),
				blacklist: this.blacklist,
				max_collisions_km: parseInt(this.max_collisions_km),
				booking: this.booking,
				booking_time: parseInt(this.booking_time),
				practice: this.practice,
				practice_time: parseInt(this.practice_time),
				can_join_practice: this.can_join_practice,
				qualify: this.qualify,
				qualify_time: parseInt(this.qualify_time),
				can_join_qualify: this.can_join_qualify,
				race: this.race,
				race_laps: parseInt(this.race_laps),
				race_time: parseInt(this.race_time),
				race_wait_time: parseInt(this.race_wait_time),
				race_extra_lap: this.race_extra_lap,
				join_type: this.join_type,
				time: this.time,
				sun_angle: parseInt(this.sun_angle),
				weather: this.weather,
				track: this.track.name,
				track_config: this.track.config,
				cars: this.selectedCars
			};

			this.$http.post('/api/addEditConfiguration', data)
			.then(function(resp){
				if(resp.data.code){
					console.log(resp.data.code+': '+resp.data.msg);
					this.err = resp.data.code;
					return;
				}

				this._reset();
				this._load();
				this.saved = true;
			});
		},
		performRemoveConfig: function(){
			this.$http.post('/api/removeConfiguration', {id: this._id})
			.then(function(resp){
				if(resp.data.code){
					console.log(resp.data.code+': '+resp.data.msg);
					return;
				}

				this._reset();
				this._load();
				this.removed = true;
			});
		},
		addWeather: function(){
			this.weather.push({
				weather: 'Clear',
				base_ambient_temp: 20,
				realistic_road_temp: 1,
				base_road_temp: 18,
				ambient_variation: 1,
				road_variation: 1
			});
		},
		removeWeather: function(i){
			this.weather.splice(i, 1);
		},
		selectTrack: function(i){
			this.selectedTrack = i;
			this.track = this.tracks[i];
		},
		selectCar: function(i){
			this.selectedCar = i;
			this.selectedPainting = 0;
			this.activePaintings = this.cars[i].paintings;
		},
		selectPainting: function(i){
			this.selectedPainting = i;
		},
		addCar: function(){
			var car = this.cars[this.selectedCar];
			this.selectedCars.push({
				car: car.name,
				painting: car.paintings[this.selectedPainting],
				position: this.selectedCars.length
			});
		},
		carUp: function(i){
			if(i == 0){
				return;
			}

			var car = this.selectedCars[i-1];
			Vue.set(this.selectedCars, i-1, this.selectedCars[i]);
			Vue.set(this.selectedCars, i, car);
		},
		carDown: function(i){
			if(i == this.selectedCars.length-1){
				return;
			}

			var car = this.selectedCars[i+1];
			Vue.set(this.selectedCars, i+1, this.selectedCars[i]);
			Vue.set(this.selectedCars, i, car);
		},
		removeCar: function(i){
			this.selectedCars.splice(i, 1);
		}
	}
});