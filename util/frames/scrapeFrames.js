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
			name: 'tr:nth-child(1) > td:last-child.desc',
			class: 'tr:nth-child(2) > td:last-child.desc',
			rarity: 'tr:nth-child(3) > td:last-child.desc',
			cost: 'tr:nth-child(3) > td:nth-child(0).desc'
		}
	}
};
