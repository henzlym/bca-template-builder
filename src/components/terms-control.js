/**
 * Wordpress dependecies.
 *
 */
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';
import { useDebounce } from '@wordpress/compose';
import { useCallback, useEffect, useMemo, useState } from '@wordpress/element';
import { addQueryArgs } from '@wordpress/url';
import { FormTokenField } from '@wordpress/components';

function TermsControl({ label = '', value, taxonomy = 'categories', onChange }) {
    const [suggestions, setSuggestions] = useState([]);
    const [tokens, setTokens] = useState([]);
    const [keyword, setKeyWord] = useState('');

    const searchTerms = useCallback(
        useDebounce(() => {
            if (keyword == '') {
                return;
            }

            const query = {
                search: keyword,
            }
            const path = addQueryArgs(`/wp/v2/${taxonomy}`, query);
            apiFetch({ path: path }).then((terms) => {

                if (terms.length == 0) return;

                const termSuggestions = terms.map((term) => {
                    return { id: term.id, name: term.name };
                });

                setSuggestions(termSuggestions);

            });
        }, 500)
    );

    useEffect(() => {

        if (value.length == 0) {
            setTokens([]);
            return;
        }

    }, [value]);

    useEffect(() => {

        if (keyword.length < 3) {
            return;
        }
        searchTerms();

    }, [keyword]);


    const tokenSuggestions = useMemo(() => {
        return suggestions.map((suggestion) => {
            return suggestion.name;
        });
    }, [suggestions]);

    return (
        <FormTokenField
            label={label}
            value={tokens}
            suggestions={tokenSuggestions}
            onChange={(tokens) => {
                let newTokens = suggestions.filter((suggestion) =>
                    tokens.includes(suggestion.name))
                    .map((suggestion) => suggestion.id);
                setTokens(tokens);
                onChange(newTokens);
            }}
            onInputChange={(value) => setKeyWord(value)}
        />
    );
}

export default TermsControl