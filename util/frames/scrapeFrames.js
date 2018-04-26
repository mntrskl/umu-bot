// FGO
module.exports.fgoServants = {
	servants: {
		_s: '#rounded-corner tr.US',
		_d: [
			{
				id: 'td:nth-child(3) @ sorttable_customkey',
				rarity: 'td:nth-child(2)',
				usaName: 'td:nth-child(4) @ sorttable_customkey',
				japName: 'td:nth-child(4) a font',
				class: 'td:nth-child(5)',
				profile: 'td:nth-child(4) a @ href'
			}
		]
	}
};
module.exports.fgoServantProfile = {
	profile: {
		_s: '#rounded-corner',
		_d: {
			name: 'tr:nth-child(1) > .desc:last-child',
			class: 'tr:nth-child(2) > .desc:last-child',
			id: 'tr:nth-child(3) > .desc:nth-child(2)',
			rarity: 'tr:nth-child(3) > .desc:last-child',
			cost: 'tr:nth-child(3) > .desc:nth-child(0)'
		}
	}
};
