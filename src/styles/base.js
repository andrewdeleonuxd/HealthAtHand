import {Platform, StyleSheet, Dimensions} from 'react-native'

export const dimensions = {
	fullHeight: Dimensions.get('window').height,
	fullWidth: Dimensions.get('window').width
}
  
export const colors  = {
	primary: '#121350',
	secondary: '#EBB11C',
	tertiary: '#7a7a9b',
	brandwhite: '#fff',
	brandblue: '#121350',
	brandgold: '#EBB11C',
	brandgrey: '#7a7a9b'
}

export const padding = {
	sm: 10,
	md: 20,
	lg: 30,
	xl: 40
}

export const fonts = {
	sm: 12,
	md: 16,
	lg: 22,
	xl: 28,
	primary: Platform.OS === 'ios' ? 'System' : 'sans-serif-condensed'
}

export const margin = {
	sm: 12,
	md: 15,
	lg: 18
}

export const button = {
	touchable: {
        opacity: 0.8,
		borderRadius: 10,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
		elevation: 7,
    },
    view: {
        flex: 1,
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'center',
        borderRadius: 10
    },
    text: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: fonts.primary, 
        color: colors.brandwhite,
        alignSelf: 'center',
    },
}

export function createStyles(overrides = {}) {
	return StyleSheet.create({...baseStyles, ...overrides})
}
