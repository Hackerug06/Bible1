// Bible data management script
const bibleVersions = {
    nkjv: {
        // This would typically be loaded from a JSON file or database
        'Genesis': {
            '1': [
                'In the beginning God created the heavens and the earth.',
                'The earth was without form, and void; and darkness was on the face of the deep...'
            ]
            // More verses would be added here
        }
        // More books would be added
    },
    niv: {
        // Similar structure for NIV version
        'Genesis': {
            '1': [
                'In the beginning God created the heavens and the earth.',
                'Now the earth was formless and empty, darkness was over the surface of the deep...'
            ]
            // More verses would be added here
        }
        // More books would be added
    }
};

const bookNames = [
    'Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy', 
    'Joshua', 'Judges', 'Ruth', '1 Samuel', '2 Samuel',
    '1 Kings', '2 Kings', '1 Chronicles', '2 Chronicles', 'Ezra',
    'Nehemiah', 'Esther', 'Job', 'Psalms', 'Proverbs',
    'Ecclesiastes', 'Song of Solomon', 'Isaiah', 'Jeremiah', 'Lamentations',
    'Ezekiel', 'Daniel', 'Hosea', 'Joel', 'Amos',
    'Obadiah', 'Jonah', 'Micah', 'Nahum', 'Habakkuk',
    'Zephaniah', 'Haggai', 'Zechariah', 'Malachi',
    'Matthew', 'Mark', 'Luke', 'John', 'Acts',
    'Romans', '1 Corinthians', '2 Corinthians', 'Galatians', 'Ephesians',
    'Philippians', 'Colossians', '1 Thessalonians', '2 Thessalonians', '1 Timothy',
    '2 Timothy', 'Titus', 'Philemon', 'Hebrews', 'James',
    '1 Peter', '2 Peter', '1 John', '2 John', '3 John',
    'Jude', 'Revelation'
];// Main application logic
document.addEventListener('DOMContentLoaded', () => {
    const versionSelect = document.getElementById('version-select');
    const bookSelect = document.getElementById('book-select');
    const chapterSelect = document.getElementById('chapter-select');
    const bibleTextContainer = document.getElementById('bible-text');
    const prevChapterBtn = document.getElementById('prev-chapter');
    const nextChapterBtn = document.getElementById('next-chapter');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const searchResults = document.getElementById('search-results');

    // Populate book selector
    function populateBookSelector() {
        bookSelect.innerHTML = '';
        bookNames.forEach(book => {
            const option = document.createElement('option');
            option.value = book;
            option.textContent = book;
            bookSelect.appendChild(option);
        });
    }

    // Populate chapter selector based on selected book
    function populateChapterSelector(book) {
        chapterSelect.innerHTML = '';
        // In a real implementation, this would use actual chapter count for the book
        const chapterCount = book === 'Psalms' ? 150 : 
                             book === 'Isaiah' ? 66 : 
                             book === 'Genesis' ? 50 : 30;
        
        for (let i = 1; i <= chapterCount; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = `Chapter ${i}`;
            chapterSelect.appendChild(option);
        }
    }

    // Load Bible text
    function loadBibleText(version, book, chapter) {
        bibleTextContainer.innerHTML = '';
        const versionData = bibleVersions[version];
        
        if (versionData && versionData[book] && versionData[book][chapter]) {
            versionData[book][chapter].forEach((verse, index) => {
                const verseElement = document.createElement('p');
                verseElement.innerHTML = `<span class="verse-number">${index + 1}</span>${verse}`;
                verseElement.classList.add('verse');
                bibleTextContainer.appendChild(verseElement);
            });
        } else {
            bibleTextContainer.textContent = 'Verses not found. This is a sample implementation.';
        }
    }

    // Event Listeners
    versionSelect.addEventListener('change', () => {
        loadBibleText(
            versionSelect.value, 
            bookSelect.value, 
            chapterSelect.value
        );
    });

    bookSelect.addEventListener('change', () => {
        populateChapterSelector(bookSelect.value);
        loadBibleText(
            versionSelect.value, 
            bookSelect.value, 
            chapterSelect.value
        );
    });

    chapterSelect.addEventListener('change', () => {
        loadBibleText(
            versionSelect.value, 
            bookSelect.value, 
            chapterSelect.value
        );
    });

    // Navigation controls
    prevChapterBtn.addEventListener('click', () => {
        const currentChapter = parseInt(chapterSelect.value);
        if (currentChapter > 1) {
            chapterSelect.value = currentChapter - 1;
            loadBibleText(
                versionSelect.value, 
                bookSelect.value, 
                chapterSelect.value
            );
        }
    });

    nextChapterBtn.addEventListener('click', () => {
        const currentChapter = parseInt(chapterSelect.value);
        const maxChapter = chapterSelect.options.length;
        if (currentChapter < maxChapter) {
            chapterSelect.value = currentChapter + 1;
            loadBibleText(
                versionSelect.value, 
                bookSelect.value, 
                chapterSelect.value
            );
        }
    });

    // Search functionality
    searchButton.addEventListener('click', () => {
        const searchTerm = searchInput.value.toLowerCase();
        searchResults.innerHTML = '';

        // Simple search implementation
        bookNames.forEach(book => {
            const versions = ['nkjv', 'niv'];
            versions.forEach(version => {
                if (bibleVersions[version][book]) {
                    Object.keys(bibleVersions[version][book]).forEach(chapter => {
                        bibleVersions[version][book][chapter].forEach((verse, verseIndex) => {
                            if (verse.toLowerCase().includes(searchTerm)) {
                                const resultDiv = document.createElement('div');
                                resultDiv.innerHTML = `
                                    <strong>${book} ${chapter}:${verseIndex + 1}</strong> 
                                    (${version.toUpperCase()}): 
                                    ${verse}
                                `;
                                resultDiv.classList.add('verse');
                                searchResults.appendChild(resultDiv);
                            }
                        });
                    });
                }
            });
        });

        // If no results found
        if (searchResults.children.length === 0) {
            searchResults.textContent = 'No verses found matching your search.';
        }
    });

    // Initial setup
    populateBookSelector();
    populateChapterSelector('Genesis');
    loadBibleText('nkjv', 'Genesis', '1');
});
