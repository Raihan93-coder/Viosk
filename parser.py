from bs4 import BeautifulSoup, Comment

def extractWords(code):
    # 1. Load HTML   
    soup = BeautifulSoup(code, 'lxml')
    tags_to_ignore = {'script', 'style', 'code', 'pre', 'meta'}

    text_nodes = soup.find_all(string=True)
    for node in text_nodes:
        # Filter out comments and whitespace-only strings
        if isinstance(node, Comment) or node.strip() == "":
            continue
            
        # Check if the parent tag is in our ignore list
        if node.parent.name in tags_to_ignore:
            continue

        original_text = node.string
        print(original_text)

def file_open():
    with open("/home/raihan/Documents/Viosk/index.html","r") as f:
        output = f.read()
    extractWords(output)

file_open()