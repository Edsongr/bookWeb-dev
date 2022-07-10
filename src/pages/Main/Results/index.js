import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Container, Wrapper, Cover } from './styles';

import { getBook } from "../../../services/books";

function Results({ isbn }) {

	const [book, setBook] = useState();

	useEffect( () => {
		const loadBook = async () => {
			const response = await getBook(isbn);
			setBook(response);
		}

		loadBook();
	}, [isbn]);

	return (
		<Container>
			<Wrapper>
				<Cover src={book.coverImage} />
				<div>

				</div>
				<div>
					
				</div>
			</Wrapper>
		</Container>
	)

}

Results.propTypes = {
	isbn: PropTypes.string.isRequired,
}

export default Results