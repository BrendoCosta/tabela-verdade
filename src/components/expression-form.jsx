'use client';

import { useDeferredValue, useEffect, useRef, useState } from 'react';
import ExpressionInput from '~/components/expression-input';

import { replaceSelectionWithOperator, wrapSelectionWithOperators } from '~/string';
import TruthTable from '~/components/truth-table';
import OperatorButtonBlocksContainer from '~/components/operator-button-blocks-container';
import generateTruthTable from '~/library';

export default function ExpressionForm ({ locale }) {
    const [truthTable, setTruthTable] = useState(null);

    const expressionInputRef = useRef(null);
    const [expressionInputValue, setExpressionInputValue] = useState('');
    const [expressionInputValidity, setExpressionInputValidity] = useState(true);
    const [expressionInputSelection, setExpressionInputSelection] = useState({
        selectionStart: 0,
        selectionEnd: 0,
    });

    const deferredExpressionInputValue = useDeferredValue(expressionInputValue);

    const getExpressionInputRefSelection = () => {
        return {
            selectionStart: expressionInputRef.current.selectionStart,
            selectionEnd: expressionInputRef.current.selectionEnd,
        };
    }

    const setExpressionInputRefSelection = ({
        selectionStart,
        selectionEnd,
    }) => {
        expressionInputRef.current.selectionStart = selectionStart;
        expressionInputRef.current.selectionEnd = selectionEnd;
    }

    const focusExpressionInputRef = () => {
        expressionInputRef.current.focus();
    };

    const replaceExpressionInputSelectionWithOperator = (operator) => {
        const {
            selectionStart,
            selectionEnd,
        } = getExpressionInputRefSelection();

        setExpressionInputValue(expressionInputValue => {
            return replaceSelectionWithOperator({
                string: expressionInputValue,
                selectionStart: selectionStart,
                selectionEnd: selectionEnd,
                operator: operator,
            });
        });

        setExpressionInputSelection({
            selectionStart: selectionStart + operator.length,
            selectionEnd: selectionStart + operator.length,
        });

        focusExpressionInputRef();
    };

    const wrapExpressionInputSelectionWithOperators = ({
        openingOperator,
        closingOperator,
        defaultOperator,
    }) => {
        const {
            selectionStart,
            selectionEnd,
        } = getExpressionInputRefSelection();

        setExpressionInputValue(expressionInputValue => {
            if (selectionStart === selectionEnd) {
                return replaceSelectionWithOperator({
                    string: expressionInputValue,
                    selectionStart: selectionStart,
                    selectionEnd: selectionEnd,
                    operator: defaultOperator,
                });
            } else {
                return wrapSelectionWithOperators({
                    string: expressionInputValue,
                    selectionStart: selectionStart,
                    selectionEnd: selectionEnd,
                    openingOperator: openingOperator,
                    closingOperator: closingOperator,
                });
            }
        });

        setExpressionInputSelection({
            selectionStart: selectionStart + openingOperator.length,
            selectionEnd: selectionEnd + closingOperator.length,
        });

        focusExpressionInputRef();
    };

    const handleExpressionInputChange = (event) => {
        setExpressionInputValue(event.target.value);
    };

    const handleWrappingOperatorButtonClick = (event) => {
        const {
            openingOperator,
            closingOperator,
            defaultOperator,
        } = event.target.dataset;

        wrapExpressionInputSelectionWithOperators({
            openingOperator,
            closingOperator,
            defaultOperator,
        });
    }

    const handleRegularOperatorButtonClick = (event) => {
        replaceExpressionInputSelectionWithOperator(event.target.dataset.operator);
    }

    useEffect(() => {
        if (deferredExpressionInputValue) {
            try {
                const truthTable = generateTruthTable(deferredExpressionInputValue);

                setTruthTable(truthTable);
                setExpressionInputValidity(true);
            } catch {
                setExpressionInputValidity(false);
            }
        } else {
            setExpressionInputValidity(true);
            setTruthTable(null);
        }
    }, [deferredExpressionInputValue]);

    useEffect(() => {
        setExpressionInputRefSelection(expressionInputSelection);
    }, [expressionInputSelection]);

    const {
        truthTableHint,
        expressionInputHint,
        truthTableTrueCellLabel,
        truthTableFalseCellLabel,
    } = locale;

    return (
        <div>
            <ExpressionInput
                inputRef={expressionInputRef}
                value={expressionInputValue}
                placeholder={expressionInputHint}
                validity={expressionInputValidity}
                onChange={handleExpressionInputChange}
            />

            <OperatorButtonBlocksContainer
                locale={locale}
                onRegularOperatorButtonClick={handleRegularOperatorButtonClick}
                onWrappingOperatorButtonClick={handleWrappingOperatorButtonClick}
            />

            <TruthTable
                truthTable={truthTable}
                truthTableHint={truthTableHint}
                truthTableTrueCellLabel={truthTableTrueCellLabel}
                truthTableFalseCellLabel={truthTableFalseCellLabel}
            />
        </div>
    );
}
