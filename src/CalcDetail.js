import AsyncStorage from '@react-native-community/async-storage';
import React, { useEffect, useState } from 'react'
import { Button, View, Dimensions, FlatList, TouchableHighlight, Text, ScrollView, StatusBar } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import {
    atan2, chain, derivative, e, evaluate, log, pi, pow, round, sqrt, factorial, exp
  } from 'mathjs'

const Layout = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
}
const CalcDetail = ({ navigation, route }) => {
    const [listButton, setListButton] = useState([])
    const [history, setHistory] = useState([])
    const [input, setInput] = useState('0')
    const [lastNumber, setLastNumber] = useState('')
    const [btnScnd, setBtnScnd] = useState(false)

    useEffect(() => {
        initialState(navigation, route)
    }, [])

    const initialState = () => {
        let newList = [
            {
                value: '2nd',
                type: 'up',
                typeInput: 'menu',
                key: 1
            }, {
                value: 'π',
                type: 'std',
                typeInput: 'change',
                key: 2
            }, {
                value: 'e',
                type: 'std',
                typeInput: 'change',
                key: 3
            }, {
                value: 'CE',
                type: 'std',
                typeInput: 'delete',
                key: 4
            }, {
                value: 'backspace',
                type: 'icon',
                typeInput: 'delete',
                key: 5
            }, {
                value: 'x^2',
                type: 'up',
                typeInput: 'change',
                key: 6
            }, {
                value: '1/x',
                type: 'std',
                typeInput: 'change',
                key: 7
            }, {
                value: '|x|',
                type: 'std',
                typeInput: 'change',
                key: 8
            }, {
                value: 'exp',
                type: 'std',
                typeInput: 'change',
                key: 9
            }, {
                value: 'mod',
                type: 'std',
                typeInput: 'opt',
                key: 10
            }, {
                value: '2^/x',
                type: 'up',
                typeInput: 'change',
                key: 11
            }, {
                value: '(',
                type: 'std',
                typeInput: 'none',
                key: 12
            }, {
                value: ')',
                type: 'std',
                typeInput: 'none',
                key: 13
            }, {
                value: 'n!',
                type: 'std',
                typeInput: 'change',
                key: 14
            }, {
                value: '/',
                type: 'std',
                typeInput: 'opt',
                key: 15
            }, {
                value: 'x^y',
                type: 'up',
                typeInput: 'opt',
                key: 16
            }, {
                value: '7',
                type: 'num',
                typeInput: 'none',
                key: 17
            }, {
                value: '8',
                type: 'num',
                typeInput: 'none',
                key: 18
            }, {
                value: '9',
                type: 'num',
                typeInput: 'none',
                key: 19
            }, {
                value: '*',
                type: 'std',
                typeInput: 'opt',
                key: 20
            }, {
                value: '10^x',
                type: 'up',
                typeInput: 'change',
                key: 21
            }, {
                value: '4',
                type: 'num',
                typeInput: 'none',
                key: 22
            }, {
                value: '5',
                type: 'num',
                typeInput: 'none',
                key: 23
            }, {
                value: '6',
                type: 'num',
                typeInput: 'none',
                key: 24
            }, {
                value: '-',
                type: 'std',
                typeInput: 'opt',
                key: 25
            }, {
                value: 'log',
                type: 'std',
                typeInput: 'change',
                key: 26
            }, {
                value: '1',
                type: 'num',
                typeInput: 'none',
                key: 27
            }, {
                value: '2',
                type: 'num',
                typeInput: 'none',
                key: 28
            }, {
                value: '3',
                type: 'num',
                typeInput: 'none',
                key: 29
            }, {
                value: '+',
                type: 'std',
                typeInput: 'opt',
                key: 30
            }, {
                value: 'ln',
                type: 'std',
                typeInput: 'change',
                key: 31
            }, {
                value: '+/-',
                type: 'up',
                typeInput: 'change',
                key: 32
            }, {
                value: '0',
                type: 'num',
                typeInput: 'none',
                key: 33
            }, {
                value: '.',
                type: 'dot',
                typeInput: 'none',
                key: 34
            }, {
                value: '=',
                type: 'sum',
                typeInput: 'sum',
                key: 35
            }
        ]
        setListButton(newList)
    }

    const handleButton = (item) => {
        let newInput = input
        let newHistory = history
        let changeInput = ''
        let lastChar = String(input).substr(String(input).length - 1, 1)
        console.log(exp(6))
        if (item.type != 'num') {
            if (lastChar == '.') {
                lastChar = lastChar + '0'
            }

            if (item.value == 'CE') {
                setHistory([])
                setInput('0')
            } else if (item.value == 'backspace') {
                setInput(String(input).substr(0, input.length - 1))
            } else if (item.type == 'dot') {
                if (!isNaN(lastChar)) {
                    setInput(newInput + item.value)
                }
            } else if (item.value == '=') {
                if (!isNaN(lastChar) || lastChar == ')') {
                    newHistory.push({ value: input + ' = ' + String(eval(input.replace('mod', '%'))).replace('%', 'mod'), key: history.length })
                    setHistory(newHistory.sort((a, b) => b.key - a.key))
                    AsyncStorage.setItem('HISTORY', JSON.stringify(newHistory))
                    setInput(String(eval(input.replace('mod', '%'))))
                }
            } else if (item.typeInput == 'change') {
                let valOpt = item.value
                if (!isNaN(lastChar)) {
                    if (input.includes(' ')) {
                        let inputReverse = String(input).split('').reverse().join('')
                        let indexSpace = inputReverse.indexOf(' ')
                        let lastValue = inputReverse.substr(0, indexSpace).split('').reverse().join('')
                        let prevInput = input.substr(0, input.length - (indexSpace + 1))
                        if (valOpt == 'π') {
                            setInput(prevInput + ' 3.1415926535')
                        } else if (valOpt == 'e') {
                            setInput(prevInput + ' 2.7182818284')
                        } else if (valOpt == 'x^2') {
                            setInput(prevInput + ' ' + String(Math.pow(lastValue, 2)))
                        } else if (valOpt == '2^/x') {
                            setInput(prevInput + ' ' + String(Math.sqrt(lastValue)))
                        } else if (valOpt == 'n!') {
                            setInput(prevInput + ' ' + String(factorial(lastValue)))
                        } else if (valOpt == '1/x') {
                            setInput(prevInput + ' ' + String(eval(`1/${lastValue}`)))
                        } else if (valOpt == '10^x') {
                            setInput(prevInput + ' ' + String(evaluate(`10^${lastValue}`)))
                        } else if (valOpt == 'log') {
                            setInput(prevInput + ' ' + String(Math.log10(lastValue)))
                        } else if (valOpt == '+/-') {
                            setInput(prevInput + ' ' + (lastValue.includes('-') ? lastValue : `(-${lastValue})`))
                        } else if (valOpt == 'sin') {
                            setInput(prevInput + ' ' + String(Math.sin(lastValue)))
                        } else if (valOpt == 'cos') {
                            setInput(prevInput + ' ' + String(Math.cos(lastValue)))
                        } else if (valOpt == 'tan') {
                            setInput(prevInput + ' ' + String(Math.tan(lastValue)))
                        } else if (valOpt == 'csc') {
                            setInput(prevInput + ' ' + String(evaluate(`1/sin(${lastValue})`)))
                        } else if (valOpt == 'sec') {
                            setInput(prevInput + ' ' + String(evaluate(`1/cos(${lastValue})`)))
                        } else if (valOpt == 'cot') {
                            setInput(prevInput + ' ' + String(evaluate(`1/tan(${lastValue})`)))
                        }
                    } else {
                        if (valOpt == 'π') {
                            setInput('3.1415926535')
                        } else if (valOpt == 'e') {
                            setInput('2.7182818284')
                        } else if (valOpt == 'x^2') {
                            setInput(String(Math.pow(input, 2)))
                        } else if (valOpt == '2^/x') {
                            setInput(String(Math.sqrt(input)))
                        } else if (valOpt == 'n!') {
                            setInput(String(factorial(input)))
                        } else if (valOpt == '1/x') {
                            setInput(String(eval(`1/${input}`)))
                        } else if (valOpt == '10^x') {
                            setInput(String(evaluate(`10^${input}`)))
                        } else if (valOpt == 'log') {
                            setInput(String(Math.log10(input)))
                        } else if (valOpt == 'ln') {
                            setInput(String(Math.log1p(input)))
                        } else if (valOpt == '+/-') {
                            setInput(input.includes('-') ? input : `-${input}`)
                        } else if (valOpt == 'sin') {
                            setInput(String(Math.sin(input)))
                        } else if (valOpt == 'cos') {
                            setInput(String(Math.cos(input)))
                        } else if (valOpt == 'tan') {
                            setInput(String(Math.tan(input)))
                        } else if (valOpt == 'csc') {
                            setInput(String(evaluate(`1/sin(${input})`)))
                        } else if (valOpt == 'sec') {
                            setInput(String(evaluate(`1/cos(${input})`)))
                        } else if (valOpt == 'cot') {
                            setInput(String(evaluate(`1/tan(${input})`)))
                        }
                    }
                } else {
                    if (valOpt == 'π') {
                        setInput(newInput + ' 3.1415926535')
                    } else if (valOpt == 'e') {
                        setInput(newInput + ' 2.7182818284')
                    }
                }

            } else if (item.typeInput == 'menu') {
                let updateListButton = listButton.slice(0)
                setBtnScnd(!btnScnd)
                updateListButton[5].value = btnScnd? 'x^2' : 'x^3'
                updateListButton[10].value = btnScnd? '2^/x' : '3^/x'
                updateListButton[15].value = btnScnd? 'x^y' : 'y^/x'
                updateListButton[20].value = btnScnd? '10^x' : '2^x'
                updateListButton[25].value = btnScnd? 'log' : 'logyX'
                updateListButton[30].value = btnScnd? 'ln' : 'e^x'
                setListButton(updateListButton)
                // console.log(updateListButton[10])
            } else {
                if (isNaN(lastChar)) {
                    if (lastChar == '.') {
                        setInput(input + '0 ' + item.value)
                    } else if (item.value == '(' || item.value == ')') {
                        changeInput = newInput + (item.value == '(' ? ' (' : `) `)
                        setInput(changeInput)
                    } else {
                        setInput(String(input).substr(0, String(input).length - (item.value == 'mod' ? 4 : 2)) + ' ' + `${item.value == 'x^y' ? '^' : item.value}`)
                    }
                } else {
                    changeInput = newInput + ` ${item.value == 'x^y' ? '^' : item.value}`
                    setInput(changeInput)
                }
            }
        } else {
            changeInput = newInput == 0 ? item.value : newInput + `${isNaN(lastChar) ? (item.type == 'dot' ? '' : (lastChar == '.' ? '' : ' ')) : ''}` + item.value
            setInput(changeInput)
            // if (changeInput.includes(' ')) {
            //     let inputReverse = String(changeInput).split('').reverse().join('')
            //     let indexSpace = inputReverse.indexOf(' ')
            //     let lastValue = inputReverse.substr(0, indexSpace).split('').reverse().join('')
            //     setLastNumber(lastValue)
            // }
        }
    }

    const Hitung = () => {
        let jumlah = String(input).indexOf('+')
        let bagi = String(input).indexOf('/')
        let kali = String(input).indexOf('*')
        let kurang = String(input).indexOf('-')
        let total = 0
        console.log('=====')
        if (jumlah != -1) {
            total = Number(String(input).substr(0, jumlah)) + Number(String(input).substr(jumlah + 1, String(input).length - 1))
        } else if (bagi != -1) {
            total = Number(String(input).substr(0, bagi)) / Number(String(input).substr(bagi + 1, String(input).length - 1))
        } else if (kali != -1) {
            total = Number(String(input).substr(0, kali)) * Number(String(input).substr(kali + 1, String(input).length - 1))
        } else if (kurang != -1) {
            total = Number(String(input).substr(0, kurang)) - Number(String(input).substr(kurang + 1, String(input).length - 1))
        }
        return total
    }

    return (
        <View style={{ backgroundColor: 'white', flex: 1 }}>
            <StatusBar
                animated={true}
                backgroundColor="#5b9af5"
            />
            <View style={{ height: 0.35 * Layout.height, width: Layout.width, backgroundColor: '#bdd7fc' }}>
                <FlatList
                    inverted
                    data={history}
                    renderItem={({ item, index, separators }) => (
                        <View key={item.key} style={{ flex: 1, alignItems: 'flex-end', paddingHorizontal: 5 }}>
                            <Text style={{ textAlign: 'right', fontSize: 14, fontWeight: '300' }}>{item.value}</Text>
                        </View>
                    )}
                />
            </View>
            <View style={{ height: 0.65 * Layout.height }}>
                <View style={{ paddingRight: 5, paddingLeft: 3, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={{ width: '25%', backgroundColor: '#c8cfdb', alignItems: 'center', paddingVertical: 2, borderRadius: 2 }}>
                        <Menu>
                            <MenuTrigger triggerText={{ fontSize: 24 }} text={'Trigonometri'} />
                            <MenuOptions style={{ borderRadius: 5 }}>
                                <View style={{ backgroundColor: 'white', borderRadius: 5 }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 10, paddingHorizontal: 3, borderRadius: 2 }}>
                                        <TouchableHighlight
                                            onPress={() => input == '' || input == Infinity || input == NaN? null : handleButton({ value: 'sin', type: 'sin', typeInput: 'change', key: 100 })}
                                            style={{ width: '30%', backgroundColor: '#bdd7fc', height: 35, alignItems: 'center', justifyContent: 'center', borderRadius: 2 }}>
                                            <Text>sin</Text>
                                        </TouchableHighlight>
                                        <TouchableHighlight
                                            onPress={() => input == '' || input == Infinity || input == NaN? null : handleButton({ value: 'cos', type: 'cos', typeInput: 'change', key: 101 })}
                                            style={{ width: '30%', backgroundColor: '#bdd7fc', height: 35, alignItems: 'center', justifyContent: 'center', borderRadius: 2 }}>
                                            <Text>cos</Text>
                                        </TouchableHighlight>
                                        <TouchableHighlight
                                            onPress={() => input == '' || input == Infinity || input == NaN? null : handleButton({ value: 'tan', type: 'tan', typeInput: 'change', key: 102 })}
                                            style={{ width: '30%', backgroundColor: '#bdd7fc', height: 35, alignItems: 'center', justifyContent: 'center', borderRadius: 2 }}>
                                            <Text>tan</Text>
                                        </TouchableHighlight>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingBottom: 10, paddingHorizontal: 3, borderRadius: 2 }}>
                                    <TouchableHighlight
                                            onPress={() => input == '' || input == Infinity || input == NaN? null : handleButton({ value: 'csc', type: 'csc', typeInput: 'change', key: 103 })}
                                            style={{ width: '30%', backgroundColor: '#bdd7fc', height: 35, alignItems: 'center', justifyContent: 'center', borderRadius: 2 }}>
                                            <Text>csc</Text>
                                        </TouchableHighlight>
                                        <TouchableHighlight
                                            onPress={() => input == '' || input == Infinity || input == NaN? null : handleButton({ value: 'sec', type: 'sec', typeInput: 'change', key: 104 })}
                                            style={{ width: '30%', backgroundColor: '#bdd7fc', height: 35, alignItems: 'center', justifyContent: 'center', borderRadius: 2 }}>
                                            <Text>sec</Text>
                                        </TouchableHighlight>
                                        <TouchableHighlight
                                            onPress={() => input == '' || input == Infinity || input == NaN? null : handleButton({ value: 'cot', type: 'cot', typeInput: 'change', key: 105 })}
                                            style={{ width: '30%', backgroundColor: '#bdd7fc', height: 35, alignItems: 'center', justifyContent: 'center', borderRadius: 2 }}>
                                            <Text>cot</Text>
                                        </TouchableHighlight>
                                    </View>
                                </View>
                            </MenuOptions>
                        </Menu>
                    </View>
                    <View style={{ alignItems: 'flex-end', backgroundColor: 'white', marginVertical: 5 }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', paddingHorizontal: 5 }}>{input}</Text>
                    </View>
                </View>
                <FlatList
                    style={{ height: '100%', backgroundColor: '#c8cfdb' }}
                    ItemSeparatorComponent={
                        Platform.OS !== 'android' &&
                        (({ highlighted }) => (
                            <View
                                style={[
                                    style.separator,
                                    highlighted && { marginLeft: 0 }
                                ]}
                            />
                        ))
                    }
                    numColumns={5}
                    data={listButton}
                    renderItem={({ item, index, separators }) => (
                        <TouchableHighlight
                            key={item.key}
                            onPress={() => handleButton(item)}
                            onShowUnderlay={separators.highlight}
                            onHideUnderlay={separators.unhighlight}>
                            <View style={{ backgroundColor: item.type == 'num' ? 'white' : (item.type == 'sum' ? 'pink' : (item.typeInput == 'menu' && btnScnd? '#c76565' : '#c8cfdb')), width: Layout.width * 0.2, height: Layout.height * 0.075, borderRightWidth: Number(item.key % 5) == 0 ? 0 : 3, borderBottomWidth: 3, borderRightColor: '#a9b0ba', borderBottomColor: '#a9b0ba', alignItems: 'center', justifyContent: 'center' }}>
                                {item.type == 'icon' ?
                                    <Ionicons name="backspace-outline" size={25} />
                                    :
                                    <Text style={{ fontWeight: item.type == 'num' ? 'bold' : '400', color: 'black', fontSize: item.type == 'num' ? 18 : 16 }}>{item.value}</Text>
                                }
                            </View>
                        </TouchableHighlight>
                    )}
                />
            </View>

        </View>
    )
}

export default CalcDetail