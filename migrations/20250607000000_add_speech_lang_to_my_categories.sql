alter table my_categories
add column if not exists speech_lang text not null default 'th-TH';
